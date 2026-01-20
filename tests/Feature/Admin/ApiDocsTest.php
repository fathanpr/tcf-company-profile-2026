<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ApiDocsTest extends TestCase
{
    use RefreshDatabase;

    protected $superuser;
    protected $regularUser;

    protected function setUp(): void
    {
        parent::setUp();
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create superuser
        Role::create(['name' => 'superuser', 'guard_name' => 'web']);
        $this->superuser = User::factory()->create();
        $this->superuser->assignRole('superuser');

        // Create regular user without roles
        $this->regularUser = User::factory()->create();
    }

    public function test_api_docs_page_is_accessible_by_superuser()
    {
        $response = $this->actingAs($this->superuser)->get(route('admin.api-docs.index'));
        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('Admin/ApiDocs/Index')
                ->has('docs')
        );
    }

    public function test_api_docs_page_is_forbidden_for_regular_users()
    {
        $response = $this->actingAs($this->regularUser)->get(route('admin.api-docs.index'));
        $response->assertStatus(403);
    }

    public function test_api_docs_page_is_forbidden_for_guests()
    {
        $response = $this->get(route('admin.api-docs.index'));
        $response->assertRedirect(route('login'));
    }
}
