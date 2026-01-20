<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Activitylog\Models\Activity;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Generate by Antigravity
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'manage users',
            'manage customers',
            'manage news',
            'manage products',
            'manage roles',
            'view logs',
            'view api-docs',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and Assign Permissions

        // Superuser Role
        $superuserRole = Role::firstOrCreate(['name' => 'Superuser']);
        $superuserRole->syncPermissions(Permission::all());

        // Blogger Role
        $bloggerRole = Role::firstOrCreate(['name' => 'Blogger']);
        $bloggerRole->syncPermissions([
            'manage news',
            'manage customers',
            'manage products',
        ]);

        // Create Default Users

        // Superuser Admin
        $superuser = User::firstOrCreate(
            ['email' => 'admin@tricentrumfortuna.com'],
            [
                'name' => 'Super Admin TCF',
                'password' => Hash::make('password'),
            ]
        );
        $superuser->assignRole($superuserRole);

        // Blogger Admin
        $blogger = User::firstOrCreate(
            ['email' => 'blogger@tricentrumfortuna.com'],
            [
                'name' => 'TCF Media Team',
                'password' => Hash::make('password'),
            ]
        );
        $blogger->assignRole($bloggerRole);

        $this->command->info('Roles and Permissions seeded successfully!');
    }
}
