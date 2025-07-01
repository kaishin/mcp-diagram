// Application data
const diagramCode = `sequenceDiagram
    %%{init: {
        'theme': 'base',
        'themeVariables': {
            'primaryColor': '#2d2d2d',
            'primaryTextColor': '#e0e0e0',
            'primaryBorderColor': '#4a4a4a',
            'lineColor': '#6a6a6a',
            'secondaryColor': '#3a3a3a',
            'tertiaryColor': '#4a4a4a',
            'background': '#1a1a1a',
            'mainBkg': '#2d2d2d',
            'secondaryTextColor': '#b0b0b0',
            'actorBkg': '#2d2d2d',
            'actorBorder': '#4a4a4a',
            'actorTextColor': '#e0e0e0',
            'actorLineColor': '#6a6a6a',
            'signalColor': '#e0e0e0',
            'signalTextColor': '#e0e0e0',
            'c0': '#1e3a5f',
            'c1': '#2d4a3a',
            'c2': '#4a2d3a',
            'c3': '#3a2d4a',
            'c4': '#4a3a2d',
            'c5': '#2d4a4a',
            'noteBkgColor': '#3a3a3a',
            'noteBorderColor': '#6a6a6a',
            'noteTextColor': '#e0e0e0'
        }
    }}%%
    participant U as User
    participant MC as MCP Client
    participant MS as MCP Server
    participant L as LLM
    participant EDS as External Data Store

    %% Initialization Phase
    rect rgb(30, 58, 95)
        Note over MC,MS: Initialization Phase
        MC->>MS: Connect/Handshake
        MS->>MC: Protocol Version & Capabilities
        MC->>MS: Confirm Connection
    end

    %% Discovery Phase  
    rect rgb(45, 74, 58)
        Note over MC,MS: Discovery Phase
        MC->>MS: List Available Tools
        MS->>MC: Tool Definitions
        MC->>MS: List Available Resources
        MS->>MC: Resource Metadata
    end

    %% Query Processing Phase
    rect rgb(74, 45, 58)
        Note over U,L: Query Processing Phase
        U->>MC: Submit Query
        MC->>L: Query + Available Tools/Resources
        L->>MC: Analysis + Tool Recommendations
    end

    %% Tool Execution Phase
    rect rgb(58, 45, 74)
        Note over MC,EDS: Tool Execution Phase
        MC->>MS: Execute Tool Request
        MS->>EDS: Access External Data
        EDS->>MS: Return Data
        MS->>MC: Tool Results
        MC->>L: Enhanced Context + Tool Results
    end

    %% Response Phase
    rect rgb(74, 58, 45)
        Note over L,U: Response Phase
        L->>MC: Generated Response
        MC->>U: Final Enhanced Response
    end

    %% Optional: Subscription/Notifications
    rect rgb(58, 58, 58)
        Note over MS,MC: Optional: Real-time Updates
        MS->>MC: Resource Change Notification
        MC->>L: Update Context
    end`;

const originalColors = [
    'rgb(240, 248, 255)',
    'rgb(245, 255, 240)',
    'rgb(255, 248, 240)',
    'rgb(248, 240, 255)',
    'rgb(255, 245, 245)',
    'rgb(250, 250, 250)'
];

const darkColors = [
    'rgb(30, 58, 95)',
    'rgb(45, 74, 58)',
    'rgb(74, 45, 58)',
    'rgb(58, 45, 74)',
    'rgb(74, 58, 45)',
    'rgb(58, 58, 58)'
];

const phaseNames = [
    'Initialization',
    'Discovery',
    'Query Processing',
    'Tool Execution',
    'Response',
    'Real-time Updates'
];

let currentView = 'dark';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMermaid();
    setupEventListeners();
    displayCode();
    createColorSwatches();
});

// Initialize Mermaid with dark theme
function initializeMermaid() {
    // Configure Mermaid
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
            primaryColor: '#2d2d2d',
            primaryTextColor: '#e0e0e0',
            primaryBorderColor: '#4a4a4a',
            lineColor: '#6a6a6a',
            secondaryColor: '#3a3a3a',
            tertiaryColor: '#4a4a4a',
            background: '#1a1a1a',
            mainBkg: '#2d2d2d',
            secondaryTextColor: '#b0b0b0'
        },
        sequence: {
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            showSequenceNumbers: false,
            actorFontSize: 14,
            actorFontFamily: '"Helvetica Neue",Arial,sans-serif',
            actorFontWeight: 400,
            noteFontSize: 14,
            noteFontFamily: '"Helvetica Neue",Arial,sans-serif',
            noteFontWeight: 400,
            noteAlign: 'center',
            messageFontSize: 16,
            messageFontFamily: '"Helvetica Neue",Arial,sans-serif',
            messageFontWeight: 400
        }
    });

    // Render the diagram
    renderDiagram();
}

// Render the Mermaid diagram
function renderDiagram() {
    const diagramContainer = document.getElementById('mermaidDiagram');
    diagramContainer.innerHTML = '<div class="mermaid-loading">Loading diagram...</div>';

    try {
        mermaid.render('mermaid-diagram', diagramCode).then(function(result) {
            diagramContainer.innerHTML = result.svg;
            
            // Apply additional styling to the SVG
            const svg = diagramContainer.querySelector('svg');
            if (svg) {
                svg.style.width = '100%';
                svg.style.height = 'auto';
                svg.style.maxWidth = '100%';
                svg.style.background = 'transparent';
            }
        }).catch(function(error) {
            console.error('Error rendering diagram:', error);
            diagramContainer.innerHTML = '<div class="mermaid-loading">Error loading diagram. Please refresh the page.</div>';
        });
    } catch (error) {
        console.error('Error rendering diagram:', error);
        diagramContainer.innerHTML = '<div class="mermaid-loading">Error loading diagram. Please refresh the page.</div>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Copy code button
    const copyBtn = document.getElementById('copyCodeBtn');
    copyBtn.addEventListener('click', copyCodeToClipboard);

    // Toggle view button
    const toggleBtn = document.getElementById('toggleViewBtn');
    toggleBtn.addEventListener('click', toggleView);

    // Add smooth scrolling for any anchor links
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
}

// Copy code to clipboard
async function copyCodeToClipboard() {
    try {
        await navigator.clipboard.writeText(diagramCode);
        showNotification('Code copied to clipboard!');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = diagramCode;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Code copied to clipboard!');
        } catch (fallbackErr) {
            showNotification('Failed to copy code. Please select and copy manually.');
        }
        document.body.removeChild(textArea);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('copyNotification');
    const textElement = notification.querySelector('.notification__text');
    
    textElement.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Toggle between views
function toggleView() {
    const toggleBtn = document.getElementById('toggleViewBtn');
    
    if (currentView === 'dark') {
        // Switch to light view (simplified version)
        currentView = 'light';
        toggleBtn.textContent = 'Show Dark Theme';
        // For simplicity, we'll just update the button text
        // In a full implementation, you might render a different diagram
    } else {
        currentView = 'dark';
        toggleBtn.textContent = 'Toggle View';
    }
}

// Display code in the code section
function displayCode() {
    const codeDisplay = document.getElementById('codeDisplay');
    codeDisplay.textContent = diagramCode;
}

// Create color swatches for comparison
function createColorSwatches() {
    const originalContainer = document.getElementById('originalColors');
    const darkContainer = document.getElementById('darkColors');

    // Create original color swatches
    originalColors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.textContent = phaseNames[index];
        swatch.title = `${phaseNames[index]}: ${color}`;
        originalContainer.appendChild(swatch);
    });

    // Create dark theme color swatches
    darkColors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.textContent = phaseNames[index];
        swatch.title = `${phaseNames[index]}: ${color}`;
        darkContainer.appendChild(swatch);
    });
}

// Add intersection observer for animations
function setupAnimationObserver() {
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

    // Observe elements for animation
    document.querySelectorAll('.card, .improvement-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupAnimationObserver, 500);
});

// Handle window resize for responsive diagram
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        const svg = document.querySelector('#mermaidDiagram svg');
        if (svg) {
            svg.style.width = '100%';
            svg.style.height = 'auto';
        }
    }, 250);
});

// Error handling for Mermaid
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('mermaid')) {
        console.error('Mermaid error:', e);
        const diagramContainer = document.getElementById('mermaidDiagram');
        if (diagramContainer) {
            diagramContainer.innerHTML = '<div class="mermaid-loading">Error loading diagram. Please refresh the page.</div>';
        }
    }
});

// Export functions for potential external use
window.MCPDiagram = {
    copyCode: copyCodeToClipboard,
    toggleView: toggleView,
    renderDiagram: renderDiagram
};