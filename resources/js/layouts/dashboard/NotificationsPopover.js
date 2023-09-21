import React from 'react';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import refreshOutline from '@iconify/icons-eva/refresh-outline';

// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';

//contect
import useNotification from '../../context/notification'

// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

import API from '../../helpers'
// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: '124124123',
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true
  },
  {
    id: '124124124',
    title: 'Bruaakakak',
    description: 'answered to your comment on the Minimal',
    avatar: mockImgAvatar(2),
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true
  },
  {
    id: '124124125',
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: '124124126',
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: '124124126',
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false
  }
];

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification?.message)}
      </Typography>
    </Typography>
  );

  // if (notification.type === 'order_placed') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'order_shipped') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'mail') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
  //     title
  //   };
  // }
  // if (notification.type === 'chat_message') {
  //   return {
  //     avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
  //     title
  //   };
  // }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
    link: notification?.link,
    id: notification?.id
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification, refresh }) {
  const { avatar, title, link, id } = renderContent(notification);

  const handleClick = () => {
    try {
      API.updateNotif(id, {is_read: true}, function(res){
        if(!res) return;
        if(!res?.success) throw new Error('error');
        else refresh()
      })        
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <ListItemButton
      onClick={handleClick}
      to={`/dashboard${link}`}
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notification?.created_at))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover({ content = [] }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  let notifications = content;
  const read = notifications.filter((item) => item.is_read === true);
  const unread = notifications.filter((item) => item.is_read === false);
  const totalUnRead = unread.length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false
      }))
    );
  };

  const { getNewNotification } = useNotification();

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          <Tooltip title="Get New Notification">
            <IconButton color="primary" onClick={getNewNotification}>
              <Icon icon={refreshOutline} width={20} height={20} />
            </IconButton>
          </Tooltip>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 240, sm: 'auto' }, overflowY: 'auto' }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Read
              </ListSubheader>
            }
          >
            {read.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Unread
              </ListSubheader>
            }
          >
            {unread.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} refresh={getNewNotification}/>
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
