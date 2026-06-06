<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Button extends Component
{
    public $href;
    public $icon;
    public $variant;
    public $disabled;

    public function __construct($href = null, $icon = null, $variant = 'primary', $disabled = false)
    {
        $this->href = $href;
        $this->icon = $icon;
        $this->variant = $variant;
        $this->disabled = $disabled;
    }

    public function render()
    {
        return view('components.button');
    }
}
