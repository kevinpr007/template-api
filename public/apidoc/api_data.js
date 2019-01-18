define({ "api": [
  {
    "type": "get",
    "url": "/admin/addSeed",
    "title": "Add Seed",
    "name": "_admin_addSeed",
    "group": "Admin",
    "version": "1.0.0",
    "description": "<p>This route will be used to create all default entities informations on the system.</p>",
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
    "type": "post",
    "url": "/auth/RefreshToken",
    "title": "Refresh Token",
    "name": "_auth_RefreshToken",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route will be used to refresh the actual token</p>",
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
            "field": "token",
            "description": "<p>This token will be used to validate and send the new token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t\t\t\"token\": \"eyJhbGciOiJAUzI1NiIsInR5cCI6IypXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ1SipDPLz7FlkJhuDIAecpz0\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   X-JWT-Refresh-Token: ayJhbYciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQwYmE5MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc1MzE5MywibmJmIjoxNTQ3NzUzMTkzLCJleHAiOjE1NjU3NTMxOTMsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.GkLc5xWJ2v2TIZRBbJ4swkE_weuXiF-N_nCprnpIbBM",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/confirmation",
    "title": "Confirmation",
    "name": "_auth_confirmation",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route will be used to validate and active your email</p>",
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
            "description": "<p>This token is send it by the application to your email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "http://localhost/api/auth/confirmation?token=aba11d10-1a7c-11e9-8941-01370007468f",
          "type": "json"
        }
      ]
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
    "description": "<p>This route will be used to do a login in the application</p>",
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
    "url": "/auth/reset_password",
    "title": "Reset Password",
    "name": "_auth_reset_password",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route will be used to reset password and set a new one</p>",
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
            "field": "password",
            "description": "<p>The new password to be use in the system</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>This token will be used to validate the user in the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t\t\t\"password\": \"test210\",\n\t\t\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ0SipDPLz7FlkJhuDIAecpz0\"\n    }",
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
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/reset_password_request",
    "title": "Reset Password Request",
    "name": "_auth_reset_password_request",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route will be used to request a reset password for a specific email</p>",
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
            "field": "email",
            "description": "<p>Email used to reset a password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t\t\t\"email\": \"test21@test.com\"\n    }",
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
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/validate_token",
    "title": "Validate Token",
    "name": "_auth_validate_token",
    "group": "Auth",
    "version": "1.0.0",
    "description": "<p>This route will be used to validate the actual token</p>",
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
            "field": "token",
            "description": "<p>This token is used to validate the key in the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t\t\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IypXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ0SipDPLz7FlkJhuDIAecpz0\"\n    }",
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
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/entity1/",
    "title": "Get All Entity1 Records",
    "name": "_entity1_",
    "group": "Entity1",
    "version": "1.0.0",
    "description": "<p>This route will be used to get all records in Entity1</p>",
    "permission": [
      {
        "name": "User"
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>The page number to get records</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost/api/entity1?page=1",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n\t\t{\n \t\t\"data\": [\n\t\t\t{\n\t\t\t\t\"_id\": \"1c3f3ccf6818632a881bf1ff\",\n\t\t\t\t\"MyField\": \"MyField\",\n\t\t\t\t\"MyDescription\": \"MyDescription\",\n\t\t\t\t\"MyNumberField\": \"5456341634\",\n\t\t\t\t\"createdAt\": \"2019-01-16T14:16:47.911Z\",\n\t\t\t\t\"updatedAt\": \"2019-01-16T14:16:47.911Z\",\n\t\t\t\t\"updatedAtPlugin\": \"2019-01-16T14:16:47.911Z\",\n\t\t\t\t\"createdAtPlugin\": \"2019-01-16T14:16:47.911Z\",\n\t\t\t\t\"__v\": 0\n\t\t\t}\n\t\t\t],\n\t\t\t\"Pagination\": {\n\t\t\t\t\"currentPage\": 1,\n\t\t\t\t\"pages\": 21,\n\t\t\t\t\"count\": 201\n\t\t\t}\n\t\t}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/entity1.js",
    "groupTitle": "Entity1"
  },
  {
    "type": "get",
    "url": "/entity1/:id",
    "title": "Search Entity1 by Id",
    "name": "_entity1__id",
    "group": "Entity1",
    "version": "1.0.0",
    "description": "<p>This route will be used to get a record of Entity1 by Id</p>",
    "permission": [
      {
        "name": "User"
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Id of the record</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost/api/entity1/6c3f3ccf62186320881bf1ff",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n {\n    \"data\": {\n        \"_id\": \"6c3f3ccf62186320881bf1ff\",\n        \"MyField\": \"MyField\",\n        \"MyDescription\": \"MyDescription\",\n        \"MyNumberField\": \"5456345634\",\n        \"createdAt\": \"2019-01-16T14:16:47.911Z\",\n        \"updatedAt\": \"2019-01-16T14:16:47.911Z\",\n        \"updatedAtPlugin\": \"2019-01-16T14:16:47.911Z\",\n        \"createdAtPlugin\": \"2019-01-16T14:16:47.911Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/entity1.js",
    "groupTitle": "Entity1"
  },
  {
    "type": "post",
    "url": "/users/AddRole",
    "title": "Add Role",
    "name": "_users_AddRole",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route will be used to add a new role to an user</p>",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId  The user ID to assign the new role</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role    The role to be added to an user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n         \"userId\": \"3c3f346f54045a240c4ae427\",\n\t        \"role\":\"Admin\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n      \"data\": {\n         \"_id\": \"8c40ba62c5fe7020e4f295dd\",\n         \"email\": \"test21@test.com\",\n         \"username\": \"test21\",\n         \"roles\": [\n             \"User\",\n             \"Admin\"\n         ],\n         \"confirmed\": true\n     }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/RemoveRole",
    "title": "Remove Role",
    "name": "_users_RemoveRole",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route will be used to remove a role from the user</p>",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId  The user ID to remove the role</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role    The role to be removed from the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n         \"userId\": \"3c3f346f54045a240c4ae427\",\n\t        \"role\":\"Admin\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n      \"data\": {\n          \"_id\": \"9c40ba62c5fe7020e4f295dd\",\n         \"email\": \"test21@test.com\",\n         \"username\": \"test21\",\n         \"roles\": [\n             \"User\"\n         ],\n         \"confirmed\": true\n     }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/SignUp",
    "title": "Sign Up",
    "name": "_users_SignUp",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route will be used for create users on the system.</p>",
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
    "title": "Get a Current User",
    "name": "_users_current_user",
    "group": "Users",
    "version": "1.0.0",
    "description": "<p>This route will be used to get the current user inside the token.</p>",
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
