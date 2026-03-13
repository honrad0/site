// Predefined invite code
const VALID_INVITE_CODE = 'possesors18201';

// Function to download beta
function downloadBeta() {
    // Create a temporary link for download
    const link = document.createElement('a');
    link.href = 'beta/Possessors.zip';
    link.download = 'Possessors.zip';
    link.style.display = 'none';
    
    // Add to DOM, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Visual feedback
    const btn = document.getElementById('downloadBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Download Started!';
    btn.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    btn.style.borderColor = '#ff0000';
    
    // Restore button after 3 seconds
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
    }, 3000);
}

// Function to validate invite code and download
function validateInviteCode() {
    const input = document.getElementById('inviteCodeInput');
    const status = document.getElementById('inviteStatus');
    const playBtn = document.getElementById('playBtn');
    
    const code = input.value.trim().toLowerCase();
    
    // Clear previous status
    status.textContent = '';
    status.className = 'invite-status';
    
    if (!code) {
        showInviteStatus('Please enter an invite code', 'error');
        input.focus();
        return;
    }
    
    if (code === VALID_INVITE_CODE) {
        // Valid code - download the game
        showInviteStatus('Valid code! Downloading game...', 'success');
        
        // Disable button
        playBtn.disabled = true;
        playBtn.innerHTML = 'Downloading...';
        
        // Download the game
        setTimeout(() => {
            downloadBeta();
            showInviteStatus('Download started! Check your downloads folder.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                playBtn.disabled = false;
                playBtn.innerHTML = 'Play';
            }, 3000);
        }, 500);
    } else {
        // Invalid code
        showInviteStatus('Invalid invite code. Please try again.', 'error');
        input.style.borderColor = 'var(--primary-red)';
        input.focus();
        
        // Reset border color after 2 seconds
        setTimeout(() => {
            input.style.borderColor = '';
        }, 2000);
    }
}

// Function to show invite status message
function showInviteStatus(message, type) {
    const status = document.getElementById('inviteStatus');
    status.textContent = message;
    status.className = `invite-status show ${type}`;
    
    // Auto-hide after 5 seconds (except for errors)
    if (type !== 'error') {
        setTimeout(() => {
            status.classList.remove('show');
            setTimeout(() => {
                status.textContent = '';
                status.className = 'invite-status';
            }, 300);
        }, 5000);
    }
}

// Allow Enter key to submit invite code
document.addEventListener('DOMContentLoaded', function() {
    const inviteInput = document.getElementById('inviteCodeInput');
    if (inviteInput) {
        inviteInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validateInviteCode();
            }
        });
        
        // Auto-format input (uppercase)
        inviteInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
        });
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards de recursos
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Efeito parallax suave no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Previne o comportamento padrão de arrastar imagens
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Adiciona efeito de hover nos botões
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Log when page loads
console.log('🎮 Possessor(s) - Site loaded successfully!');

// YouTube Error 153 Fix - Handle iframe load errors
document.addEventListener('DOMContentLoaded', function() {
    const youtubeIframe = document.querySelector('.video-wrapper iframe');
    
    if (youtubeIframe) {
        // Add error handler
        youtubeIframe.addEventListener('load', function() {
            console.log('YouTube iframe loaded successfully');
        });
        
        // Try to detect if video failed to load
        youtubeIframe.addEventListener('error', function() {
            console.error('YouTube iframe failed to load');
            // You can add fallback content here if needed
        });
    }
});

