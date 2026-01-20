<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiDocsController extends Controller
{
    /**
     * Generate by Antigravity
     */
    public function index()
    {
        $docs = [
            [
                'module' => 'Authentication',
                'endpoints' => [
                    [
                        'method' => 'POST',
                        'url' => '/api/login',
                        'description' => 'Login user and return token',
                        'payload' => [
                            'email' => 'string|required',
                            'password' => 'string|required',
                        ]
                    ],
                    [
                        'method' => 'GET',
                        'url' => '/api/user',
                        'description' => 'Get authenticated user info',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ]
                ]
            ],
            [
                'module' => 'News',
                'endpoints' => [
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/news',
                        'description' => 'Get list of news',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'POST',
                        'url' => '/api/v1/news',
                        'description' => 'Create new news article',
                        'headers' => ['Authorization' => 'Bearer {token}'],
                        'payload' => [
                            'title' => 'string|required',
                            'excerpt' => 'string|required',
                            'content' => 'string|required',
                            'published_at' => 'datetime|required',
                            'image' => 'file|nullable'
                        ]
                    ],
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/news/{id}',
                        'description' => 'Get news detail',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'PUT',
                        'url' => '/api/v1/news/{id}',
                        'description' => 'Update news article',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'DELETE',
                        'url' => '/api/v1/news/{id}',
                        'description' => 'Delete news article',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ]
                ]
            ],
            [
                'module' => 'Products',
                'endpoints' => [
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/products',
                        'description' => 'Get list of products',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'POST',
                        'url' => '/api/v1/products',
                        'description' => 'Create new product',
                        'headers' => ['Authorization' => 'Bearer {token}'],
                        'payload' => [
                            'name' => 'string|required',
                            'description' => 'string|nullable',
                            'customer_id' => 'integer|nullable',
                            'is_active' => 'boolean'
                        ]
                    ],
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/products/{id}',
                        'description' => 'Get product detail',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'PUT',
                        'url' => '/api/v1/products/{id}',
                        'description' => 'Update product',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'DELETE',
                        'url' => '/api/v1/products/{id}',
                        'description' => 'Delete product',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ]
                ]
            ],
            [
                'module' => 'Customers',
                'endpoints' => [
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/customers',
                        'description' => 'Get list of customers',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'POST',
                        'url' => '/api/v1/customers',
                        'description' => 'Create new customer',
                        'headers' => ['Authorization' => 'Bearer {token}'],
                        'payload' => [
                            'name' => 'string|required',
                            'website' => 'string|nullable',
                            'is_active' => 'boolean'
                        ]
                    ],
                    [
                        'method' => 'GET',
                        'url' => '/api/v1/customers/{id}',
                        'description' => 'Get customer detail',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'PUT',
                        'url' => '/api/v1/customers/{id}',
                        'description' => 'Update customer',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ],
                    [
                        'method' => 'DELETE',
                        'url' => '/api/v1/customers/{id}',
                        'description' => 'Delete customer',
                        'headers' => ['Authorization' => 'Bearer {token}']
                    ]
                ]
            ]
        ];

        return Inertia::render('Admin/ApiDocs/Index', [
            'docs' => $docs,
            'title' => 'API Documentation'
        ]);
    }
}
