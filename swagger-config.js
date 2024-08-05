const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dự án Trung Thuận',
      version: '1.0.0',
      description: 'Phần mô tả dự án',  
    },
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file định nghĩa API
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;