<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_spa_is_served_for_the_root_route_and_deep_links(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('id="root"', false);

        $this->get('/support')
            ->assertOk()
            ->assertSee('id="root"', false);
    }
}
