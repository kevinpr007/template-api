define({ "api": [
  {
    "type": "get",
    "url": "/admin/addSeed",
    "title": "Add Seed",
    "name": "_admin_addSeed",
    "group": "Admin",
    "version": "1.0.0",
    "description": "<p>This route will create all entities information on the system.</p>",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>JSON Format.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token created by the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n     \"Content-Type\": \"application/json\",\n     \"Authorization\": \"Bearer {TOKEN-XXXXXXX}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/addSeed",
    "title": "Add Seed",
    "name": "addSeed_XXXXXXXXXXXX",
    "group": "Admin",
    "version": "1.0.0",
    "description": "<p>This is the Description. It is multiline capable.</p> <p>Last line of Description.</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/user/4711",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept-Encoding\": \"Accept-Encoding: gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>Optional Firstname of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Mandatory Lastname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "defaultValue": "DE",
            "description": "<p>Mandatory with default value &quot;DE&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "age",
            "defaultValue": "18",
            "description": "<p>Optional Age with default 18.</p>"
          }
        ],
        "Login": [
          {
            "group": "Login",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Only logged in users can post this. In generated documentation a separate &quot;Login&quot; Block will be generated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": 4711\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/utils/doc_references.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/auth/confirmation",
    "title": "Confirmation",
    "name": "_auth_confirmation",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route is used to validate and active your email.</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>This token is send it by the application to your email.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n\t\t{\n\t\t\t\"data\": {\n\t\t\t\t\"_id\": \"1c40ba61c5fe7020e4f295dd\",\n\t\t\t\t\"email\": \"test21@test.com\",\n\t\t\t\t\"username\": \"test21\",\n\t\t\t\t\"roles\": [\n\t\t\t\t\t\"User\"\n\t\t\t\t],\n\t\t\t\t\"confirmed\": true,\n\t\t\t\t\"token\": \"eaJhbGciOiJIUzI1NiIsInR5cCI5IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc0Njc1MSwibmJmIjoxNTQ3NzQ2NzUxLCJleHAiOjE1NjU3NDY3NTEsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.Wt2byaWsYHBcTMDXBpzN5qS1MBJcasQ5UlZlTGB67Fs\"\n\t\t\t}\n\t\t}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "_auth_login",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route is used to login in the application</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>JSON Format.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n     \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email registered in the system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password used in the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t\t\t\"email\": \"test21@test.com\",\n\t\t\t\"password\": \"test21\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n\t\t{\n\t\t\t\"data\": {\n\t\t\t\t\"_id\": \"1c40ba62c5fa7020e4f295dd\",\n\t\t\t\t\"email\": \"test21@test.com\",\n\t\t\t\t\"username\": \"test21\",\n\t\t\t\t\"roles\": [\n\t\t\t\t\t\"User\"\n\t\t\t\t],\n\t\t\t\t\"confirmed\": true,\n\t\t\t\t\"token\": \"ayJhbGciOiJIUzI1NiIsInR5cCI7IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU8DIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc0NzA5MSwibmJmIjoxNTQ3NzQ3MDkxLCJleHAiOjE1NjU3NDcwOTEsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.20C8vZjXGI_Z8U66uwAS7ot3QwLsrp8ECaywkj2q0fo\"\n\t\t\t}\n\t\t}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/users/SignUp",
    "title": "Sign Up",
    "name": "_users_SignUp",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route is use for create users on the system.</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>JSON Format.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n     \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email used in the system as primary key.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password required on the system.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username used in the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"email\": \"test21@test.com\",\n     \"password\":\"test21\",\n     \"username\":\"test21\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n     \"data\": {\n         \"_id\": \"1c40ba62c5fe7020e4f295dd\",\n         \"email\": \"test21@test.com\",\n         \"username\": \"test21\",\n         \"roles\": [\n             \"User\"\n         ],\n         \"confirmed\": false,\n         \"token\": \"ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOmZhbHNlLCJpYXQiOjE1NDc3NDU4OTEsIm5iZiI6MTU0Nzc0NTg5MSwiZXhwIjoxNTY1NzQ1ODkxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCJ9.dkKr9l975JymZ-ejw6UC8pJjBllRd58jj8GD_etC1aU\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/current_user",
    "title": "Get Current User",
    "name": "_users_current_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route is use for get the current user inside the token.</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>JSON Format.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token created by the system.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n     \"Content-Type\": \"application/json\",\n     \"Authorization\": \"Bearer {TOKEN-XXXXXXX}\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost/api/users/current_user",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n       \"data\": {\n         \"_id\": \"1c40ba62c5fe7020e4f295dd\",\n         \"email\": \"test21@test.com\",\n         \"username\": \"test21\",\n         \"roles\": [\n             \"User\"\n         ],\n         \"confirmed\": true\n     }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "Users"
  }
] });
