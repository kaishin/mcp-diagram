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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMermaid();
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