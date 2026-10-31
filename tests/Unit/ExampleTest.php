<?php

namespace Tests\Unit;

use Illuminate\Foundation\Application;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_application_boots_and_reports_a_framework_version(): void
    {
        $this->assertInstanceOf(Application::class, $this->app);
        $this->assertMatchesRegularExpression('/^\d+\.\d+\.\d+/', $this->app->version());
    }
}
