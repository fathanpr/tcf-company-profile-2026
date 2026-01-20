<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ApiAccessTest extends TestCase
{
    use RefreshDatabase;

    protected $superuser;

    protected function setUp(): void
    {
        parent::setUp();
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create superuser role and user
        Role::create(['name' => 'superuser', 'guard_name' => 'web']);
        $this->superuser = User::factory()->create();
        $this->superuser->assignRole('superuser');
    }

    public function test_api_endpoints_are_protected_from_guests()
    {
        $response = $this->getJson('/api/v1/news');
        $response->assertStatus(401);
    }

    public function test_regular_user_cannot_access_api()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/news');
        $response->assertStatus(403);
    }

    public function test_superuser_can_manage_news()
    {
        // 1. Create News
        $newsData = [
            'title' => 'Test News',
            'excerpt' => 'Test Excerpt',
            'content' => 'Test Content',
            'published_at' => now()->format('Y-m-d H:i:s'),
            'is_published' => true,
        ];

        $response = $this->actingAs($this->superuser, 'sanctum')->postJson('/api/v1/news', $newsData);
        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'Test News']);

        $newsId = $response->json('id');

        // 2. Read News List
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson('/api/v1/news');
        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Test News']);

        // 3. Read Single News
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson("/api/v1/news/{$newsId}");
        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Test News']);

        // 4. Update News
        $updateData = ['title' => 'Updated News Title'];
        $response = $this->actingAs($this->superuser, 'sanctum')->putJson("/api/v1/news/{$newsId}", $updateData);
        $response->assertStatus(200);

        // Verify Update
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson("/api/v1/news/{$newsId}");
        $response->assertJsonFragment(['title' => 'Updated News Title']);

        // 5. Delete News
        $response = $this->actingAs($this->superuser, 'sanctum')->deleteJson("/api/v1/news/{$newsId}");
        $response->assertStatus(204);

        // Verify Deletion
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson("/api/v1/news/{$newsId}");
        $response->assertStatus(404);
    }

    public function test_superuser_can_manage_products()
    {
        // 1. Create Product
        $productData = [
            'name' => 'Test Product',
            'description' => 'Product Description',
            'is_active' => true,
        ];

        $response = $this->actingAs($this->superuser, 'sanctum')->postJson('/api/v1/products', $productData);
        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Test Product']);

        $productId = $response->json('id');

        // 2. Read Product List
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson('/api/v1/products');
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Test Product']);

        // 3. Update Product
        $updateData = ['name' => 'Updated Product Name'];
        $response = $this->actingAs($this->superuser, 'sanctum')->putJson("/api/v1/products/{$productId}", $updateData);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Product Name']);

        // 4. Delete Product
        $response = $this->actingAs($this->superuser, 'sanctum')->deleteJson("/api/v1/products/{$productId}");
        $response->assertStatus(204);
    }

    public function test_superuser_can_manage_customers()
    {
        // 1. Create Customer
        $customerData = [
            'name' => 'Test Customer',
            'website' => 'https://example.com',
            'is_active' => true,
        ];

        $response = $this->actingAs($this->superuser, 'sanctum')->postJson('/api/v1/customers', $customerData);
        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Test Customer']);

        $customerId = $response->json('id');

        // 2. Read Customer List
        $response = $this->actingAs($this->superuser, 'sanctum')->getJson('/api/v1/customers');
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Test Customer']);

        // 3. Update Customer
        $updateData = ['name' => 'Updated Customer Name'];
        $response = $this->actingAs($this->superuser, 'sanctum')->putJson("/api/v1/customers/{$customerId}", $updateData);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Customer Name']);

        // 4. Delete Customer
        $response = $this->actingAs($this->superuser, 'sanctum')->deleteJson("/api/v1/customers/{$customerId}");
        $response->assertStatus(204);
    }
}
