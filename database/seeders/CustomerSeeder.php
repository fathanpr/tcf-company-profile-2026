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
            ['name' => 'HANYA KARYA BAHANA'],
            ['name' => 'HIRUTA KOGYO INDONESIA'],
            ['name' => 'INDOSAFETY SENTOSA INDUSTRY'],
            ['name' => 'INTI PANTJA PRESS INDUSTRI'],
            ['name' => 'JFD INDONESIA'],
            ['name' => 'JTEKT COLUMN STEERING INDONESIA'],
            ['name' => 'KARYA BAHANA UNIGAM'],
            ['name' => 'KAYABA INDONESIA'],
            ['name' => 'MEIWA INDONESIA'],
            ['name' => 'METINDO ERASAKTI'],
            ['name' => 'SUMMIT ADYAWINSA INDONESIA'],
            ['name' => 'TOKAI RUBBER INDONESIA'],
            ['name' => 'TOYOTA BOSHOKU INDONESIA'],
            ['name' => 'TS TECH INDONESIA'],
            ['name' => 'VELASTO INDONESIA'],

            // Automotive - 2W
            ['name' => 'ELECTRA MOBILITAS INDONESIA (ALVA)'],
            ['name' => 'EXEDY MANUFACTURING INDONESIA'],
            ['name' => 'TVS MOTOR COMPANY'],
            ['name' => 'YUTAKA MANUFACTURING INDONESIA'],

            // Non Automotive & Electronics
            ['name' => 'JAYA REFRIGERATION EQUIPMENT (MIDEA)'],
            ['name' => 'PANASONIC MANUFACTURING INDONESIA'],
            ['name' => 'PARAMOUNT BED INDONESIA'],
        ];

        foreach ($customers as $customer) {
            Customer::create([
                'name' => $customer['name'],
                'logo' => 'img/tcf-logo.png', // Default logo as requested
                'is_active' => true
            ]);
        }
    }
}
