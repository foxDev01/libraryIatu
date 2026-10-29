<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_root_page_renders_the_spa(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('id="root"', false);
    }

    public function test_spa_is_served_for_client_side_routes(): void
    {
        $this->get('/support')
            ->assertOk()
            ->assertSee('id="root"', false);
    }
}
