<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testAuth()
    {
        $url ='/api/login';
        $data= ['email' => 'faraday073@gmail.com', 
                'password' => '1234567890',]; 
        $response= $this->json('POST',$url, $data);
            $response->assertStatus(200);
            
    }
}
