# laravel-react-bsi
 Development of new BSI (Buana Sandang Indonesia) System.

## Requirement

Sebelum menjalankan semua source code di library ini, pastikan sudah menginstall:
```
php version 7.1.16
Composer version 2.2.6
MySQL (build in Xampp)
Node version 16.0.0
NPM version 7.10.0
```

## Installation

Install ``laravel-react-bsi``:

- [PHP v 7.1.16](https://www.php.net/distributions/php-7.1.16.tar.gz)
- [Node js v 16.0.0](https://nodejs.org/download/release/v16.0.0/)
- [Composer v 2.2.6](https://getcomposer.org/download/)

Setelah menginstall semua packages diatas bisa clone repository.

```php artisan migrate```

Arahkan terminal ke folder repository yang telah di download sebelumnya. lalu setelah selesai, jalankan perintah ini untuk menginstall react pada laravel:

```npm install```

Untuk memulai program bisa menjalankan proses ini:

```npm run watch```

dan jalankan perintah dibawah ini untuk menjalankan laravel:

```php artisan serve```


## API Reference

### External API
You must understand if there is an access token in order to securing this API. Please ask the administrator to get the accesss token.

The authorization requires you to put access token on request header. It's look like that.

```
curl -X GET \
  'https://api.example.com/api/v2/some-api-endpoint' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN_HERE'
```

============================================================================
#### Get all shipment document

```http
  GET /api/v2/finance/shipment?paginate={number_of_data}&shipment_type_id={shipment_type_id}&month={month}&year={year}&page={page_number}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `paginate` | `int` | Default is 10, if you want to increase or decrease page you can make some adjustment here |
| `shipment_type_id` | `int` | There `4` type of shipment. Define shipment user would like to get, **`1`** is Incoming Shipment, **`2`** is Outgoing/Outbound Shipment, **`3`** Incoming Shipment of Subcontract Business, and **`4`** Outgoing/Outbound Shipment  |
| `page` | `int` | Default 1, provide what pages |
| `month` | `int` | **Required** provide month filter based on created_date, cannot be null |
| `year` | `int` | **Required** provide year filter based on created_date, cannot be null |

#### Get item on spesific shipment document

```http
  GET /api/v2/finance/shipment-items/${shipment_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `shipment_id`      | `int` | **Required**. Id of items on choosen purchae order to fetch |

============================================================================
#### Get all purchase order document

```http
  GET /api/v2/finance/purchase-order?paginate={number_of_data}&month={month}&year={year}&page={page_number}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `paginate` | `int` | Default is 10, if you want to increase or decrease page you can make some adjustment here |
| `page_number` | `int` | It will direct you on the next data (if exists)|
| `month` | `int` | **Required** provide month filter based on created_date, cannot be null |
| `year` | `int` | **Required** provide year filter based on created_date, cannot be null |



#### Get item on spesific purchae order document

```http
  GET /api/v2/finance/purchase-order-items/${purchase_order_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `purchase_order_id`      | `int` | **Required**. Id of items on choosen purchae order to fetch |

============================================================================
#### Get all invoice document

```http
  GET /api/v2/finance/invoice?paginate={number_of_data}&invoice_type={invoice_type}&month={month}&year={year}&page={page_number}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `paginate` | `int` | Default is 10, if you want to increase or decrease page you can make some adjustment here |
| `invoice_type` | `int` | there is `2` type of invoices, **`1`** for Invoice is issued from BSI (based on sales order), **`2`** for Invoice given by external party (source from Purchase Order)|
| `month` | `int` | **Required** provide month filter based on created_date, cannot be null |
| `year` | `int` | **Required** provide year filter based on created_date, cannot be null |

#### Get item on spesific purchae order document

```http
  GET /api/v2/finance/invoice-items/${invoice_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `invoice_id`      | `int` | **Required**. Id of items on choosen purchae order to fetch |

========================================================================
#### Get all material transfer document

Goods Movement (Mutasi Barang);

```http
  GET /api/v2/finance/material-transfer?paginate={number_of_data}&month={month}&year={year}&page={page_number}&from_facility={from_facility}&to_facility={to_facility}
```

This API automatically filtered with from_facility and to_facility which is similiar with the incoming shipment.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `paginate` | `int` | Default is 10, if you want to increase or decrease page you can make some adjustment here |
| `month` | `int` | **Required** provide month filter based on created_date, cannot be null |
| `year` | `int` | **Required** provide year filter based on created_date, cannot be null |
| `from_facility` | `int` | **Required** provide the id of an specific facility whose own the material, cannot be null |
| `to_facility` | `int` | **Required** provide the id of an specific facility where requested the material, cannot be null |


#### Get item on spesific purchae order document

```http
  GET /api/v2/finance/material-transfer-items/${material_transfer_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `material_transfer_id`      | `int` | **Required**. Id of items on choosen purchae order to fetch |

============================================================================

#### Get all material transfer item filtered with month and from n to document

Goods Movement (Mutasi Barang);

```http
  GET /api/v2/finance/material-transfer-filtered?month={month}&year={year}&from_facility={from_facility}&to_facility={to_facility}
```

This API automatically filtered with from_facility and to_facility which is similiar with the incoming shipment.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `month` | `int` | **Required** provide month filter based on created_date, cannot be null |
| `year` | `int` | **Required** provide year filter based on created_date, cannot be null |
| `from_facility` | `int` | **Required** provide the id of an specific facility whose own the material, cannot be null |
| `to_facility` | `int` | **Required** provide the id of an specific facility where requested the material, cannot be null |

#### Get all Sales Order

```http
  GET /api/sales-order
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway sales order diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Purchase Order

```http
  GET /api/purchase-order
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway purchase order diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order

```http
  GET /api/order
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order

```http
  GET /api/order-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order Status

```http
  GET /api/order-status
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order status diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order Role

```http
  GET /api/order-role
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order role diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order Association

```http
  GET /api/order-association
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order association diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Product

```http
  GET /api/product
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway product diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Service

```http
  GET /api/service
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway service diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Goods

```http
  GET /api/goods
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway goods diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Inventory

```http
  GET /api/inventory
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway inventory diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Inventory Type

```http
  GET /api/inventory-type
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway inventory-type diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Part

```http
  GET /api/part
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway part diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Part BOM

```http
  GET /api/part-bom
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway part-bom diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Product

```http
  GET /api/product
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway product diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Product Category

```http
  GET /api/product-category
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway product-category diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Product Feature

```http
  GET /api/product-feature
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway product-feature diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Address

```http
  GET /api/address
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway addres diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Organization

```http
  GET /api/organization
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway organization diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Party

```http
  GET /api/party
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway party diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Party Roles

```http
  GET /api/party-roles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway party-roles diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Person

```http
  GET /api/person
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway person diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Relationship

```http
  GET /api/relationship
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway relationship diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Status

```http
  GET /api/status
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway status diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Quote

```http
  GET /api/quote
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway quote diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Quote Item

```http
  GET /api/quote-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway quote-item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Quote Role

```http
  GET /api/quote-role
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway quote-role diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Request

```http
  GET /api/request
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway request diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Request Item

```http
  GET /api/request-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway request-item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Requirement

```http
  GET /api/requirement
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway requirement diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Requirement has request

```http
  GET /api/requirement-has-request
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway requirement-has-request diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Requirement has request item

```http
  GET /api/requirement-has-request-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway requirement-has-request-item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Agreement

```http
  GET /api/agreement
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway agreement diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Agreement Role

```http
  GET /api/agreement-role
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway agreement-role diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Agreement Item

```http
  GET /api/agreement-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway agreement-item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Price Component

```http
  GET /api/price-component
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway price-component diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Item Issuance

```http
  GET /api/item-issuance
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway item-issuance diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Order Shipment

```http
  GET /api/order-shipment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway order-shipment diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Shipment

```http
  GET /api/shipment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway shipment diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Shipment Item

```http
  GET /api/shipment-item
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway shipment-item diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Shipment Receipt

```http
  GET /api/shipment-receipt
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway shipment-receipt diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

#### Get all Shipment Role

```http
  GET /api/shipment-role
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | - |

#### Response
Dari API Gateway shipment-role diatas akan dikirimkan balik:

```
{
    data: [
        ...,
        ..
    ]
}
```

    
## Roadmap

- Additional browser support

- Add more integrations

