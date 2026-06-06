@php
    $baseClasses = 'inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    $variants = [
        'primary'   => 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        'success'   => 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        'danger'    => 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        'warning'   => 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
        'outline'   => 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
        'ghost'     => 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    ];

    $variantClass = $variants[$variant] ?? $variants['primary'];
    $disabledClass = $disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    $finalClasses = $baseClasses . ' ' . $variantClass . ' ' . $disabledClass;
@endphp

@if($href && !$disabled)
    <a href="{{ $href }}" class="{{ $finalClasses }}" {{ $attributes }}>
        @if($icon)<i class="fas {{ $icon }}"></i>@endif
        {{ $slot }}
    </a>
@else
    <button {{ $disabled ? 'disabled' : '' }} class="{{ $finalClasses }}" {{ $attributes }}>
        @if($icon)<i class="fas {{ $icon }}"></i>@endif
        {{ $slot }}
    </button>
@endif
