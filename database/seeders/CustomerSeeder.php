<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Generate by Antigravity
     */
    public function run(): void
    {
        $customers = [
            // Automotive - 4W
            ['name' => 'ADIENT INDONESIA'],
            ['name' => 'ADYAWINSA STAMPING INDUSTRIES'],
            ['name' => 'AISIN INDONESIA'],
            ['name' => 'AUTO ASKA INDONESIA'],
            ['name' => 'BONECOM TRICOM INDONESIA'],
            ['name' => 'DAECHANG SEAT COMPANY'],
            ['name' => 'FSCM MANUFACTURING INDONESIA'],
            ['name' => 'FUJI SEAT INDONESIA'],
            ['name' => 'FUJI TECHNICA INDONESIA'],
            ['name' => 'FUTABA INDONESIA'],
        ];

        foreach ($customers as $customer) {
            Customer::create([
                'name' => $customer['name'],
                'logo' => '/img/tcf-logo.png', // Default logo as requested
                'is_active' => true
            ]);
        }
    }
}
