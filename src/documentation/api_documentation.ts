export const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    description: 'API documentation for routes. Access the Readme for instructions.',
  },
  servers: [
    {
      url: 'http://localhost:5001/',
      description: 'Local server'
    }
  ],
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  tags: [
    {
      name: 'Routes'
    }
  ],
  paths: {
    '/v1/stats': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns the number of clients, products and orders.',
        description: 'Returns the quantity for dashboard.',
        parameters: [],
        responses: {
          '200': {
            content: {
              'application/json': {
                example: {
                  clients: "1",
                  products: "1",
                  orders: "1"
                }
              }
            }
          }
        }
      },
    },
    '/v1/clients/create-client': { // **POST**
      post: {
        tags: ['Save and Edit operations'],
        summary: "Create the client",
        description: 'Create the client in database.',
        parameters: [
          {
            name: 'cl_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Name'
          },
          {
            name: 'cl_responsible',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Responsible Name'
          },
          {
            name: 'cl_phone',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Phone'
          },
          {
            name: 'cl_active',
            in: 'payload',
            schema: {
              type: 'boolean'
            },
            required: true,
            description: 'Indicates if the client is active or not'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Client'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Client Created Successfully!' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/clients/edit-client/:id': { // **PUT**
      put: {
        tags: ['Save and Edit operations'],
        summary: "Edit a client",
        description: 'Edit a client in database.',
        parameters: [
          {
            name: 'cl_id',
            in: 'params',
            schema: {
                type: 'number'
            },
            required: true,
            description: 'Cliente ID'
          },
          {
            name: 'cl_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Name'
          },
          {
            name: 'cl_responsible',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Responsible Name'
          },
          {
            name: 'cl_phone',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Client Phone'
          },
          {
            name: 'cl_active',
            in: 'payload',
            schema: {
              type: 'boolean'
            },
            required: true,
            description: 'Indicates if the client is active or not'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClientEdit'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Client Updated Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/orders/create-order': { // **POST**
      post: {
        tags: ['Save and Edit operations'],
        summary: "Create an order",
        description: 'Create an order in database.',
        parameters: [
          {
            name: 'ord_cl_id',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Foreign Key that indicates the client order'
          },
          {
            name: 'ord_pdt_id',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Foreign Key that indicates the product'
          },
          {
            name: 'ord_quantity',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Quantity'
          },
          {
            name: 'ord_description',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Description'
          },
          {
            name: 'ord_status',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Status'
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Order Created Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/orders/edit-order/:id': { // **POST**
      put: {
        tags: ['Save and Edit operations'],
        summary: "Edit the order",
        description: 'Edit the order in database.',
        parameters: [
          {
            name: 'ord_id',
            in: 'params',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order ID to update'
          },
          {
            name: 'ord_cl_id',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Foreign Key that indicates the client order'
          },
          {
            name: 'ord_pdt_id',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Foreign Key that indicates the product'
          },
          {
            name: 'ord_quantity',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Quantity'
          },
          {
            name: 'ord_description',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Description'
          },
          {
            name: 'ord_status',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Order Status'
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OrderEdit'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Order Updated Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/categories/create-category': { // **POST**
      post: {
        tags: ['Save and Edit operations'],
        summary: "Create the category",
        description: 'Create the category in database.',
        parameters: [
          {
            name: 'cat_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Category Name'
          },
          {
            name: 'cat_image',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Category Image Link'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Category'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Category Created Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/categories/edit-category/:id': { // **PUt**
      put: {
        tags: ['Save and Edit operations'],
        summary: "Edit a category",
        description: 'Edit a category in database.',
        parameters: [
          {
            name: 'cat_id',
            in: 'params',
            schema: {
              type: 'number'
            },
            required: true,
            description: 'Category ID to be updated'
          },
          {
            name: 'cat_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Category Name'
          },
          {
            name: 'cat_image',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Category Image Link'
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoryEdit'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Category Updated Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/categories/products/create-product': { // **PUt**
      post: {
        tags: ['Save and Edit operations'],
        summary: "Create a product",
        description: 'Edit a product in database.',
        parameters: [
          {
            name: 'pdt_cat_id',
            in: 'params',
            schema: {
              type: 'number'
            },
            required: true,
            description: 'Foreign Key that indicates Category'
          },
          {
            name: 'pdt_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product Name'
          },
          {
            name: 'pdt_image',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product Image Link'
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Product Created Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/categories/products/edit-product/:id': { // **PUT**
      put: {
        tags: ['Save and Edit operations'],
        summary: "Edit a product",
        description: 'Edit a product in database.',
        parameters: [
          {
            name: 'pdt_id',
            in: 'params',
            schema: {
                type: 'string'
            },
            required: true,
            description: 'Product ID'
          },
          {
            name: 'pdt_cat_id',
            in: 'params',
            schema: {
              type: 'number'
            },
            required: true,
            description: 'Foreign Key that indicates Category'
          },
          {
            name: 'pdt_name',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product Name'
          },
          {
            name: 'pdt_image',
            in: 'payload',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product Image Link'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductEdit'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'If all data were sent correctly',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Product Updated Successfully' 
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      },
    },
    '/v1/clients': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns clients data ',
        description: 'Returns an array with clients data ',
        parameters: [],
        responses: {
          '200': {
            description: 'Returns an array with clients data.',
            content: {
              'application/json': {
                example: [
                  {
                    cl_id: 1,
                    cl_name: "Company 1",
                    cl_responsible: "Ana",
                    cl_phone: "99999-8888",
                    cl_active: true
                  },
                  {
                    cl_id: 2,
                    cl_name: "Company 2",
                    cl_responsible: "James",
                    cl_phone: "99999-8888",
                    cl_active: true
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/v1/categories': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns categories data ',
        description: 'Returns categories data ',
        parameters: [],
        responses: {
          '200': {
            description: 'Returns an array containing category data.',
            content: {
              'application/json': {
                example: [
                  {
                    cat_id: 1,
                    cat_name: "Category Name",
                    cat_image: "Image Link",
                  },
                  {
                    cat_id: 2,
                    cat_name: "Sapatos",
                    cat_image: "Image Link",
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/v1/categories/products': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns products data ',
        description: 'Returns products data ',
        parameters: [],
        responses: {
          '200': {
            description: 'Returns an array containing products data.',
            content: {
              'application/json': {
                example: [
                  {
                    pdt_id: 1,
                    pdt_cat_id: 1,
                    ptd_name: "Product Name",
                    pdt_image: "Some image URL"
                  },
                  {
                    pdt_id: 2,
                    pdt_cat_id: 1,
                    ptd_name: "Product Name",
                    pdt_image: "Some image URL"
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/v1/orders': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns orders data ',
        description: 'Returns orders data ',
        parameters: [],
        responses: {
          '200': {
            description: 'Returns an array containing orders data.',
            content: {
              'application/json': {
                example: [
                  {
                    ord_id: 1,
                    ord_cl_id: 1, 
                    ord_pdt_id: 1,
                    ord_quantity: 1,
                    ord_description: "Some description", 
                    ord_status: true
                  },
                  {
                    ord_id: 2,
                    ord_cl_id: 1, 
                    ord_pdt_id: 1,
                    ord_quantity: 1,
                    ord_description: "Some description", 
                    ord_status: true
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/v1/clients/:id': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns data from a client through its id',
        description: '',
        parameters: [],
        responses: {
          '200': {
            content: {
              'application/json': {
                example: {
                  cl_name: "Company 1",
                  cl_responsible: "Ana",
                  cl_phone: "99999-8888",
                  cl_active: true
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories/:id': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns data from a category through its id',
        description: '',
        parameters: [],
        responses: {
          '200': {
            description: 'Retorns a object containing category data.',
            content: {
              'application/json': {
                example: {
                  cat_name: "Cat. Name",
                  cat_image: "Some Image Link",
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories/products/:id': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns data from a product through its id',
        description: '',
        parameters: [],
        responses: {
          '200': {
            content: {
              'application/json': {
                example: {
                  pdt_id: 1,
                  pdt_name: "Product Name",
                  pdt_image: "Image"
                }
              }
            }
          }
        }
      }
    },
    '/v1/orders/:id': { // **GET**
      get: {
        tags: ['Get Data'],
        summary: 'Returns data from a order through its id',
        description: '',
        parameters: [],
        responses: {
          '200': {
            content: {
              'application/json': {
                example: {
                  ord_id: 1,
                  ord_cl_id: 1,
                  ord_pdt_id: 1,
                  ord_quantity: 5,
                  ord_description: "Description Updated",
                  ord_status: true
                }
              }
            }
          }
        }
      }
    },
    '/v1/clients/delete-client/:id':{ // **DELETE**
      delete: {
        tags: ['Delete Data'],
        summary: 'Delete a client.',
        description: 'Delete a client in database.',
        parameters: [
          {
            name: 'id',
            in: 'params',
            schema: {
              type: 'number'
            },
            description: 'Client ID to be deleted'
          }
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                example: {
                  success: true, 
                  message: 'Client Deleted Successfully!'
                }
              }
            }
          },
          '404': {
            description: 'Client Not Found!',
            content: {
              'application/json': {
                example: {
                  message: 'Client Not Found!'
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      }
    },
    '/v1/orders/delete-order/:id':{ // **DELETE**
      delete: {
        tags: ['Delete Data'],
        summary: 'Delets an order.',
        description: 'Delets an order in database.',
        parameters: [
          {
            name: 'id',
            in: 'params',
            schema: {
              type: 'number'
            },
            description: 'Order ID to be deleted'
          }
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                example: {
                  success: true, 
                  message: 'Order Deleted Successfully!'
                }
              }
            }
          },
          '404': {
            description: 'Order Not Found!',
            content: {
              'application/json': {
                example: {
                  message: 'Order Not Found!'
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories/delete-category/:id':{ // **DELETE**
      delete: {
        tags: ['Delete Data'],
        summary: 'Deletes a category.',
        description: 'Deletes a category in database.',
        parameters: [
          {
            name: 'id',
            in: 'params',
            schema: {
              type: 'number'
            },
            description: 'Category ID to be deleted'
          }
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                example: {
                  success: true, 
                  message: 'Category Deleted Successfuly'
                }
              }
            }
          },
          '404': {
            description: 'Category Not Found!',
            content: {
              'application/json': {
                example: {
                  message: 'Category Not Found!'
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      }
    },
    '/v1/categories/products/delete-product':{ // **DELETE**
      delete: {
        tags: ['Delete Data'],
        summary: 'Deletes a category.',
        description: 'Deletes a category in database.',
        parameters: [
          {
            name: 'id',
            in: 'payload',
            schema: {
              type: 'number'
            },
            description: 'Product ID to be deleted'
          }
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                example: {
                  success: true, 
                  message: 'Product Deleted Successfuly'
                }
              }
            }
          },
          '404': {
            description: 'Product Not Found!',
            content: {
              'application/json': {
                example: {
                  message: 'Product Not Found!'
                }
              }
            }
          },
          '500': {
            description: 'Exception (Catch Exception)',
            content: {
              'application/json': {
                example: {
                  success: false
                }
              }
            }
          }
        }
      }
    },
  },
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          cl_name: {
            type: 'string',
            example: 'T.I Company'
          },
          cl_responsible: {
            type: 'string',
            example: 'Marcos'
          },
          cl_phone: {
            type: 'string',
            example: '999887766'
          },
          cl_active: {
            type: 'boolean',
            example: true
          },
        }
      },
      ClientEdit: {
        type: 'object',
        properties: {
          cl_id: {
            type: 'number',
            example: 1
          },
          cl_name: {
            type: 'string',
            example: 'T.I Company'
          },
          cl_responsible: {
            type: 'string',
            example: 'Marcos'
          },
          cl_phone: {
            type: 'string',
            example: '999887766'
          },
          cl_active: {
            type: 'boolean',
            example: true
          },
        }
      },
      Category: {
        type: 'object',
        properties: {
          cat_name: {
            type: 'string',
            example: 'Category Name'
          },
          cat_image: {
            type: 'string',
            example: 'Image Link'
          },
        }
      },
      CategoryEdit: {
        type: 'object',
        properties: {
          cat_id: {
            type: 'number',
            example: 1
          },
          cat_name: {
            type: 'string',
            example: 'Category Name'
          },
          cat_image: {
            type: 'string',
            example: 'Image Link'
          },
        }
      },
      Product: {
        type: 'object',
        properties: {
          pdt_cat_id: {
            type: 'number',
            example: 1
          },
          ptd_name: {
            type: 'string',
            example: 'Camiseta Branca'
          },
          pdt_image: {
            type: 'string',
            example: './assets'
          }
        }
      },
      ProductEdit: {
        type: 'object',
        properties: {
          pdt_id: {
            type: 'number',
            example: 1
          },
          pdt_cat_id: {
            type: 'number',
            example: 1
          },
          ptd_name: {
            type: 'string',
            example: 'Camiseta Branca'
          },
          pdt_image: {
            type: 'string',
            example: './assets'
          }
        }
      },
      Order: {
        type: 'object',
        properties: {
          ord_cl_id: {
            type: 'number',
            example: '1'
          },
          ord_pdt_id: {
            type: 'number',
            example: '1'
          },
          ord_quantity: {
            type: 'number',
            example: '5'
          },
          ord_description: {
            type: 'string',
            example: 'Do not deliver on the weekend'
          },
          ord_status: {
            type: 'boolean',
            example: true
          },
        }
      },
      OrderEdit: {
        type: 'object',
        properties: {
          ord_id: {
            type: 'number',
            example: 1
          },
          ord_cl_id: {
            type: 'number',
            example: '1'
          },
          ord_pdt_id: {
            type: 'number',
            example: '1'
          },
          ord_quantity: {
            type: 'number',
            example: '5'
          },
          ord_description: {
            type: 'string',
            example: 'Do not deliver on the weekend'
          },
          ord_status: {
            type: 'boolean',
            example: true
          },
        }
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    }
  }
}