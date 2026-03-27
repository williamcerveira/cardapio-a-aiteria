# Download all remaining food images from Unsplash
$ErrorActionPreference = "Continue"

# BASES
$bases = @{
    "public\assets\images\bases\acai-zero.png" = "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?w=600&h=600&fit=crop"
    "public\assets\images\bases\acai-banana.png" = "https://images.unsplash.com/photo-1610450949065-1f110fa3e8ce?w=600&h=600&fit=crop"
    "public\assets\images\bases\sorvete-ninho.png" = "https://images.unsplash.com/photo-1570197788417-0e82375c9ca7?w=600&h=600&fit=crop"
    "public\assets\images\bases\sorvete-morango.png" = "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop"
}

# FILLINGS
$fillings = @{
    "public\assets\images\fillings\pistache.png" = "https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?w=600&h=600&fit=crop"
    "public\assets\images\fillings\morango.png" = "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop"
    "public\assets\images\fillings\nutella.png" = "https://images.unsplash.com/photo-1587840171670-8b850147754e?w=600&h=600&fit=crop"
    "public\assets\images\fillings\creme-ninho.png" = "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop"
    "public\assets\images\fillings\uva.png" = "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=600&fit=crop"
    "public\assets\images\fillings\kiwi.png" = "https://images.unsplash.com/photo-1585059895524-72f2819a5814?w=600&h=600&fit=crop"
}

# TOPPINGS
$toppings = @{
    "public\assets\images\toppings\granola.png" = "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600&h=600&fit=crop"
    "public\assets\images\toppings\leite-ninho.png" = "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop"
    "public\assets\images\toppings\mel.png" = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop"
    "public\assets\images\toppings\pacoca.png" = "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=600&h=600&fit=crop"
    "public\assets\images\toppings\ovomaltine.png" = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop"
    "public\assets\images\toppings\leite-condensado.png" = "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop"
}

$all = @{}
$all += $bases
$all += $fillings
$all += $toppings

foreach ($entry in $all.GetEnumerator()) {
    Write-Host "Downloading: $($entry.Key)..."
    try {
        Invoke-WebRequest -Uri $entry.Value -OutFile $entry.Key -TimeoutSec 30
        Write-Host "  OK" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nAll downloads complete!" -ForegroundColor Cyan
