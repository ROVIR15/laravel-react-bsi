import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import {
  Box,
  Divider,
  IconButton,
  List,
  Avatar,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Paper,
  Pagination,
  PaginationItem,
  Stack,
  Tooltip
} from '@mui/material';
import useNotification from '../../context/notification';
import API from '../../helpers';

import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import refreshOutline from '@iconify/icons-eva/refresh-outline';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification?.message)}
      </Typography>
    </Typography>
  );

  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
    link: notification?.link,
    id: notification?.id
  };
}

function NotificationItem({ notification, refresh }) {
  const { avatar, title, link, id } = renderContent(notification);

  const handleClick = () => {
    try {
      API.updateNotif(id, { is_read: true }, function (res) {
        if (!res) return;
        if (!res?.success) throw new Error('error');
        else refresh();
      });
    } catch (error) {
      alert(error);
    }
  };

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
        ...(notification.is_read && {
          backgroundColor: 'action.selected'
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

function NotificationList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getNewNotification, totalUnread, totalPage, data } = useNotification();

  const handleChangePage = (e, page) => {
    getNewNotification(`?page=${page}`);
    setCurrentPage(page);
  };

  const handleMarkAllAsRead = () => {
    try {
      API.markAllAsRead(user?.id, function(res) {
        if(!res) return;
        if(!res.success) return;
        else console.log('mark as all');
      })  
    } catch (err) {
      alert(err);
    }

    getNewNotification(`?page=${page}`);
  };

  let notifications = data;

  return (
    <Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            You have {totalUnread} unread messages
          </Typography>
        </Box>

        <Tooltip title="Get new notification">
          <IconButton color="primary" onClick={getNewNotification}>
            <Icon icon={refreshOutline} width={20} height={20} />
          </IconButton>
        </Tooltip>

        {totalUnread > 0 && (
          <Tooltip title=" Mark all as read">
            <IconButton color="primary" onClick={handleMarkAllAsRead}>
              <Icon icon={doneAllFill} width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider />

      <List
        disablePadding
        subheader={
          <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
            Notification
          </ListSubheader>
        }
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </List>

      <Divider />

      <Stack spacing={2}>
        <Pagination
          size='medium'
          count={totalPage}
          page={currentPage}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
        />
      </Stack>
    </Paper>
  );
}

export default NotificationList;
