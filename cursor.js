// Cursor Particles Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.appendChild(canvas);
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // This ensures the canvas doesn't interfere with clicks
    canvas.style.zIndex = '9999'; // High z-index to be above all content
    
    // Set canvas size
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    // Call setCanvasSize initially and on window resize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random initial velocity in all directions
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            // Random particle size
            this.size = Math.random() * 5 + 1;
            // Random particle lifetime
            this.life = 100;
            this.maxLife = 100;
            // Get theme colors for particles
            this.color = this.getThemeColor();
        }
        
        // Update particle position and properties each frame
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 1;
            
            // Gradually reduce the particle size as it ages
            if (this.size > 0.1) this.size -= 0.1;
        }
        
        // Draw the particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Calculate opacity based on remaining life
            const opacity = this.life / this.maxLife;
            
            // Use gradient for particles to make them glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            
            gradient.addColorStop(0, `${this.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba')}`);
            gradient.addColorStop(1, `${this.color.replace(')', `, 0)`).replace('rgb', 'rgba')}`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        // Get theme color based on current theme
        getThemeColor() {
            // Get the computed style of an element to access CSS variables
            const computedStyle = getComputedStyle(document.body);
            
            // Get primary and accent colors from CSS variables
            const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
            const accentColor = computedStyle.getPropertyValue('--accent-color').trim();
            
            // Use either primary or accent color randomly
            return Math.random() > 0.5 ? primaryColor : accentColor;
        }
    }
    
    // Main variables
    let particles = [];
    let isDrawing = false;
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    
    // Mouse move handler
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Calculate mouse speed
        const dx = mouseX - lastX;
        const dy = mouseY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Create particles based on mouse speed
        const particleCount = Math.floor(speed / 2) + 1;
        
        for (let i = 0; i < particleCount; i++) {
            // Add some randomness to particle positions
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 10;
            
            particles.push(new Particle(mouseX + offsetX, mouseY + offsetY));
        }
        
        // Update last position
        lastX = mouseX;
        lastY = mouseY;
    }
    
    // Add mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', () => { isDrawing = true; });
    document.addEventListener('mouseup', () => { isDrawing = false; });
    
    // Main animation loop
    function animate() {
        // Clear canvas with a transparent fill to create trailing effect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Remove dead particles
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        // Limit the maximum number of particles for performance
        if (particles.length > 300) {
            particles = particles.slice(particles.length - 300);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Touch support for mobile devices
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            
            // Create particles
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(mouseX, mouseY));
            }
            
            // Update last position
            lastX = mouseX;
            lastY = mouseY;
        }
    }, { passive: false });
    
    // Refresh particle colors when theme changes
    function updateParticleColors() {
        particles.forEach(particle => {
            particle.color = particle.getThemeColor();
        });
    }
    
    // Observer to detect theme changes (via class changes on body)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateParticleColors();
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, { attributes: true });
    
    // Also update colors when theme is changed via the dropdown
    const themeOptions = document.querySelectorAll('.theme-dropdown-content a');
    themeOptions.forEach(option => {
        option.addEventListener('click', updateParticleColors);
    });
});