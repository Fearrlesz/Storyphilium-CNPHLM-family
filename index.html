<!DOCTYPE html>
<html lang="ru" data-theme="cosmic">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Storyphilium Pro — Сценарный редактор</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet" />

    <style>
        /* ===== RESET & BASE ===== */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :root {
            --bg-main: #0B0A14;
            --bg-surface: #15132B;
            --bg-card: #1E1B38;
            --bg-input: #0F0D1F;
            --bg-input-focus: #19163A;
            --accent: #6C4AB6;
            --accent-hover: #8A6CD4;
            --accent-border: #4A3A7A;
            --accent-light: #2A2250;
            --text-primary: #E5B8FF;
            --text-secondary: #B89AD9;
            --text-light: #8A7AAA;
            --shadow-soft: 0 4px 24px rgba(108, 74, 182, 0.15);
            --shadow-hover: 0 12px 40px rgba(108, 74, 182, 0.25);
            --border-light: 1px solid rgba(74, 58, 122, 0.4);
            --radius: 16px;
            --radius-sm: 10px;
            --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            --script-font: 'Courier Prime', 'Courier New', monospace;
            --transition: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            --sidebar-width: 280px;
        }

        [data-theme="espresso"] {
            --bg-main: #4A2C20;
            --bg-surface: #5C3A2B;
            --bg-card: #6E4533;
            --bg-input: #3D241A;
            --bg-input-focus: #553227;
            --accent: #B87333;
            --accent-hover: #CC8A4A;
            --accent-border: #8A5A3A;
            --accent-light: #5C3A2B;
            --text-primary: #F1DEC2;
            --text-secondary: #D4B89A;
            --text-light: #B2947A;
            --shadow-soft: 0 4px 24px rgba(184, 115, 51, 0.20);
            --shadow-hover: 0 12px 40px rgba(184, 115, 51, 0.30);
            --border-light: 1px solid rgba(138, 90, 58, 0.5);
        }

        [data-theme="neural-white"] {
            --bg-main: #F6F8FC;
            --bg-surface: #FFFFFF;
            --bg-card: #FFFFFF;
            --bg-input: #FFFFFF;
            --bg-input-focus: #FAFBFD;
            --accent: #5D8CFF;
            --accent-hover: #4A7AEE;
            --accent-border: #B0C8F0;
            --accent-light: #E3EBFA;
            --text-primary: #1A2330;
            --text-secondary: #3D4A5A;
            --text-light: #6B7A8A;
            --shadow-soft: 0 4px 24px rgba(93, 140, 255, 0.08);
            --shadow-hover: 0 12px 40px rgba(93, 140, 255, 0.14);
            --border-light: 1px solid rgba(176, 200, 240, 0.35);
        }

        [data-theme="emerald"] {
            --bg-main: #1A2A24;
            --bg-surface: #243A32;
            --bg-card: #2D4A3F;
            --bg-input: #16221E;
            --bg-input-focus: #20352C;
            --accent: #5ECC67;
            --accent-hover: #72E07A;
            --accent-border: #3A7A45;
            --accent-light: #2A4A35;
            --text-primary: #D4EAD0;
            --text-secondary: #A0C8A0;
            --text-light: #7AAA80;
            --shadow-soft: 0 4px 24px rgba(94, 204, 103, 0.15);
            --shadow-hover: 0 12px 40px rgba(94, 204, 103, 0.25);
            --border-light: 1px solid rgba(58, 122, 69, 0.4);
        }

        [data-theme="neural-blue"] {
            --bg-main: #E8EDF8;
            --bg-surface: #F4F7FC;
            --bg-card: #FFFFFF;
            --bg-input: #FFFFFF;
            --bg-input-focus: #F0F4FA;
            --accent: #5D8CFF;
            --accent-hover: #4A7AEE;
            --accent-border: #A0BCE8;
            --accent-light: #DCE6F5;
            --text-primary: #1A2A40;
            --text-secondary: #3A5070;
            --text-light: #6A809A;
            --shadow-soft: 0 4px 24px rgba(93, 140, 255, 0.10);
            --shadow-hover: 0 12px 40px rgba(93, 140, 255, 0.18);
            --border-light: 1px solid rgba(160, 188, 232, 0.35);
        }

        [data-theme="cosmic"] {
            --bg-main: #17152E;
            --bg-surface: #1F1D3A;
            --bg-card: #2A2850;
            --bg-input: #14122A;
            --bg-input-focus: #1A1840;
            --accent: #6C4AB6;
            --accent-hover: #8A6CD4;
            --accent-border: #4A3A7A;
            --accent-light: #2A2250;
            --text-primary: #E5B8FF;
            --text-secondary: #B89AD9;
            --text-light: #8A7AAA;
            --shadow-soft: 0 4px 24px rgba(108, 74, 182, 0.15);
            --shadow-hover: 0 12px 40px rgba(108, 74, 182, 0.25);
            --border-light: 1px solid rgba(74, 58, 122, 0.4);
        }

        html,
        body {
            height: 100%;
            overflow: hidden;
        }

        body {
            font-family: var(--font);
            background: var(--bg-main);
            color: var(--text-primary);
            display: flex;
            flex-direction: column;
            padding: 14px 18px 0;
            transition: background 0.4s, color 0.4s;
        }

        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-main);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--accent);
            border-radius: 20px;
        }

        /* ===== HEADER ===== */
        .app-header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: 10px 24px;
            background: var(--bg-surface);
            border-radius: var(--radius);
            box-shadow: var(--shadow-soft);
            margin-bottom: 10px;
            border: var(--border-light);
            flex-shrink: 0;
            transition: all 0.4s;
            gap: 8px;
        }

        .app-header .brand {
            display: flex;
            align-items: baseline;
            gap: 6px;
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .app-header .brand .story {
            font-size: 18px;
            letter-spacing: -0.3px;
        }
        .app-header .brand .separator {
            color: var(--accent-border);
            font-weight: 300;
        }
        .app-header .brand .family {
            font-size: 20px;
            font-weight: 400;
            color: var(--text-secondary);
        }

        .app-header .header-actions {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            align-items: center;
        }

        .project-selector {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
        }
        .project-selector select {
            padding: 4px 10px;
            border-radius: var(--radius-sm);
            border: var(--border-light);
            background: var(--bg-input);
            color: var(--text-primary);
            font-family: var(--font);
            font-size: 12px;
            font-weight: 500;
            max-width: 140px;
            cursor: pointer;
            outline: none;
        }
        .project-selector select:focus {
            border-color: var(--accent);
        }
        .project-selector .project-actions {
            display: flex;
            gap: 4px;
        }

        .theme-selector {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
        }
        .theme-selector select {
            padding: 4px 8px;
            border-radius: var(--radius-sm);
            border: var(--border-light);
            background: var(--bg-input);
            color: var(--text-primary);
            font-family: var(--font);
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            outline: none;
            max-width: 140px;
        }
        .theme-selector select:focus {
            border-color: var(--accent);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-family: var(--font);
            font-weight: 600;
            font-size: 12px;
            padding: 6px 14px;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all var(--transition);
            white-space: nowrap;
            letter-spacing: 0.2px;
            background: var(--bg-card);
            color: var(--text-primary);
            border: 1px solid transparent;
        }
        .btn-primary {
            background: var(--accent);
            color: #fff;
            box-shadow: 0 2px 12px rgba(108, 74, 182, 0.2);
        }
        .btn-primary:hover {
            background: var(--accent-hover);
            box-shadow: 0 6px 20px rgba(108, 74, 182, 0.25);
            transform: translateY(-1px);
        }
        .btn-secondary {
            background: var(--bg-card);
            color: var(--text-primary);
            border: var(--border-light);
        }
        .btn-secondary:hover {
            background: var(--bg-main);
            border-color: var(--accent);
            transform: translateY(-1px);
        }
        .btn-outline {
            background: transparent;
            color: var(--text-secondary);
            border: var(--border-light);
        }
        .btn-outline:hover {
            background: var(--bg-card);
            border-color: var(--accent);
            transform: translateY(-1px);
        }
        .btn-danger {
            background: #e8d0d0;
            color: #5a3a3a;
        }
        .btn-danger:hover {
            background: #ddc0c0;
            transform: translateY(-1px);
        }
        .btn-sm {
            font-size: 10px;
            padding: 4px 10px;
        }
        .btn-icon {
            font-size: 15px;
            padding: 6px 10px;
            min-width: 34px;
        }
        .btn.active {
            background: var(--accent);
            color: #fff;
            border-color: var(--accent);
        }

        .export-select {
            padding: 4px 8px;
            background: var(--bg-card);
            border: var(--border-light);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-family: var(--font);
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            outline: none;
            height: 30px;
        }
        .export-select:focus {
            border-color: var(--accent);
        }

        /* ===== TOOLBAR ===== */
        .editor-toolbar {
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 6px 16px;
            background: var(--bg-surface);
            border-radius: var(--radius-sm) var(--radius-sm) 0 0;
            border-bottom: var(--border-light);
            flex-shrink: 0;
            transition: all 0.4s;
            flex-wrap: wrap;
        }
        .editor-toolbar .toolbar-group {
            display: flex;
            gap: 4px;
            align-items: center;
            flex-wrap: wrap;
        }
        .editor-toolbar .toolbar-group .group-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-light);
            margin-right: 4px;
            font-weight: 600;
        }
        .editor-toolbar .toolbar-btn {
            background: transparent;
            border: none;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            transition: all 0.2s;
            font-family: var(--font);
        }
        .editor-toolbar .toolbar-btn:hover {
            background: var(--accent-light);
            color: var(--text-primary);
        }
        .editor-toolbar .toolbar-btn.active {
            background: var(--accent);
            color: #fff;
        }
        .editor-toolbar .spacer {
            flex: 1;
        }
        .editor-toolbar .stats {
            display: flex;
            gap: 14px;
            font-size: 12px;
            color: var(--text-secondary);
            flex-wrap: wrap;
        }
        .editor-toolbar .stats span {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .editor-toolbar .stats .num {
            font-weight: 700;
            color: var(--accent);
            min-width: 16px;
        }
        .editor-toolbar .status-indicator {
            font-size: 12px;
            color: var(--text-light);
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .editor-toolbar .status-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent);
            transition: all 0.3s;
        }
        .editor-toolbar .status-dot.saving {
            background: #f0c040;
            animation: pulse 0.6s ease-in-out 3;
        }
        .editor-toolbar .status-dot.saved {
            background: var(--accent);
        }

        @keyframes pulse {
            0%,
            100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.4);
                opacity: 0.5;
            }
        }

        /* ===== MAIN LAYOUT ===== */
        .main-area {
            flex: 1;
            min-height: 0;
            display: flex;
            gap: 0;
            border-radius: 0 0 var(--radius) var(--radius);
            overflow: hidden;
            background: var(--bg-surface);
            box-shadow: var(--shadow-soft);
            border: var(--border-light);
            border-top: none;
            position: relative;
            transition: all 0.4s;
        }

        .editor-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            background: var(--bg-surface);
            position: relative;
        }

        .editor-wrapper textarea {
            flex: 1;
            width: 100%;
            padding: 1.6cm 2.2cm;
            font-family: var(--script-font);
            font-size: 13pt;
            line-height: 1.85;
            color: var(--text-primary);
            background: var(--bg-input);
            border: none;
            outline: none;
            resize: none;
            transition: background 0.3s, padding 0.4s, font-size 0.4s;
            letter-spacing: 0.15px;
            tab-size: 4;
        }
        .editor-wrapper textarea:focus {
            background: var(--bg-input-focus);
        }
        .editor-wrapper textarea::placeholder {
            color: var(--text-light);
            opacity: 0.35;
            font-family: var(--font);
            font-size: 14px;
            font-weight: 400;
        }

        .exit-focus-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: var(--accent);
            color: #fff;
            border: none;
            border-radius: var(--radius-sm);
            padding: 10px 20px;
            font-family: var(--font);
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .exit-focus-btn:hover {
            background: var(--accent-hover);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 6px 32px rgba(0, 0, 0, 0.5);
        }
        .exit-focus-btn.visible {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
        }
        .exit-focus-btn .shortcut {
            font-size: 11px;
            opacity: 0.7;
            font-weight: 400;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            width: var(--sidebar-width);
            background: var(--bg-card);
            border-left: var(--border-light);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            overflow: hidden;
            transition: width 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
            opacity: 1;
        }
        .sidebar.closed {
            width: 0;
            opacity: 0;
            margin-right: 0;
            border-left: none;
            pointer-events: none;
        }
        .sidebar-header {
            padding: 10px 14px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-secondary);
            border-bottom: var(--border-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }
        .sidebar-header .close-sidebar {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            font-size: 16px;
            padding: 0 4px;
        }
        .sidebar-header .close-sidebar:hover {
            color: var(--text-primary);
        }

        .sidebar-tabs {
            display: flex;
            border-bottom: var(--border-light);
            flex-shrink: 0;
        }
        .sidebar-tabs button {
            flex: 1;
            background: none;
            border: none;
            padding: 8px 0;
            font-family: var(--font);
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }
        .sidebar-tabs button.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
        }
        .sidebar-tabs button:hover {
            color: var(--text-primary);
            background: var(--bg-main);
        }

        .sidebar-content {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
        }
        .sidebar-content .tab-pane {
            display: none;
            padding: 0 8px;
        }
        .sidebar-content .tab-pane.active {
            display: block;
        }

        .sidebar-item {
            padding: 6px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            line-height: 1.4;
            color: var(--text-secondary);
            transition: all 0.15s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
        }
        .sidebar-item:hover {
            background: var(--bg-main);
            color: var(--text-primary);
        }
        .sidebar-item .item-num {
            display: inline-block;
            min-width: 24px;
            font-weight: 600;
            color: var(--accent);
            margin-right: 6px;
        }
        .sidebar-item .item-name {
            font-weight: 500;
        }
        .sidebar-item .item-desc {
            font-size: 12px;
            color: var(--text-light);
            margin-left: 30px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .sidebar-empty {
            padding: 20px 14px;
            color: var(--text-light);
            font-size: 13px;
            text-align: center;
        }

        /* ===== FIND/REPLACE BAR ===== */
        .find-replace-bar {
            display: none;
            padding: 8px 16px;
            background: var(--bg-surface);
            border-top: var(--border-light);
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
            font-size: 12px;
        }
        .find-replace-bar.open {
            display: flex;
        }
        .find-replace-bar input {
            padding: 4px 10px;
            border: var(--border-light);
            border-radius: 6px;
            background: var(--bg-input);
            color: var(--text-primary);
            font-family: var(--font);
            font-size: 12px;
            min-width: 120px;
        }
        .find-replace-bar input:focus {
            border-color: var(--accent);
            outline: none;
        }
        .find-replace-bar .fr-label {
            color: var(--text-secondary);
            font-weight: 500;
        }
        .find-replace-bar .fr-actions {
            display: flex;
            gap: 4px;
        }

        /* ===== FOOTER ===== */
        .app-footer {
            flex-shrink: 0;
            padding: 6px 24px;
            margin-top: 10px;
            background: var(--bg-surface);
            border-radius: var(--radius);
            box-shadow: var(--shadow-soft);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            color: var(--text-secondary);
            border: var(--border-light);
            transition: all 0.4s;
        }
        .app-footer .copy {
            font-weight: 500;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 4px;
        }
        .app-footer .copy .family {
            font-weight: 400;
            color: var(--text-secondary);
        }
        .app-footer .copy .separator {
            color: var(--accent-border);
        }
        .app-footer .footer-right {
            display: flex;
            gap: 14px;
            align-items: center;
            flex-wrap: wrap;
        }
        .app-footer .footer-right .timer {
            color: var(--text-light);
            font-variant-numeric: tabular-nums;
        }

        .hotkeys-hint {
            font-size: 10px;
            color: var(--text-light);
            opacity: 0.6;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .hotkeys-hint kbd {
            background: var(--bg-card);
            padding: 1px 7px;
            border-radius: 4px;
            border: var(--border-light);
            font-size: 9px;
            font-family: var(--font);
            font-weight: 600;
            color: var(--text-secondary);
        }

        /* ===== FOCUS MODE ===== */
        body.focus-mode .app-header,
        body.focus-mode .app-footer,
        body.focus-mode .editor-toolbar,
        body.focus-mode .sidebar {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s;
        }
        body.focus-mode .main-area {
            border-radius: var(--radius);
            border: var(--border-light);
        }
        body.focus-mode .editor-wrapper textarea {
            padding: 2cm 3cm;
            font-size: 15pt;
        }

        /* ===== PRINT ===== */
        .print-content {
            display: none;
        }

        @media print {
            body {
                background: white;
                padding: 0;
                margin: 0;
                overflow: visible;
            }
            .app-header,
            .app-footer,
            .editor-toolbar,
            .find-replace-bar,
            .sidebar,
            .exit-focus-btn {
                display: none !important;
            }
            .main-area {
                border-radius: 0;
                box-shadow: none;
                border: none;
                overflow: visible;
            }
            .editor-wrapper textarea {
                display: none !important;
            }
            .print-content {
                display: block !important;
                white-space: pre-wrap;
                font-family: 'Courier Prime', 'Courier New', monospace;
                font-size: 12pt;
                padding: 2cm 2.5cm;
                line-height: 1.6;
                background: white;
                color: black;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            body * {
                visibility: hidden;
            }
            .print-content,
            .print-content * {
                visibility: visible;
            }
            .print-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: auto;
                margin: 0;
                padding: 2cm 2.5cm;
            }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
            .app-header .brand .family {
                font-size: 18px;
            }
            .app-header .brand .story {
                font-size: 16px;
            }
            .editor-wrapper textarea {
                padding: 1.4cm 1.8cm;
                font-size: 12.5pt;
            }
            .editor-toolbar .stats {
                font-size: 11px;
                gap: 10px;
            }
            .project-selector select {
                max-width: 120px;
                font-size: 11px;
            }
            .sidebar {
                width: 230px;
            }
            :root {
                --sidebar-width: 230px;
            }
            .exit-focus-btn {
                top: 16px;
                right: 16px;
                padding: 8px 16px;
                font-size: 13px;
            }
        }

        @media (max-width: 768px) {
            body {
                padding: 8px 10px 0;
            }
            .app-header {
                padding: 8px 12px;
                gap: 6px;
            }
            .app-header .brand {
                font-size: 13px;
            }
            .app-header .brand .family {
                font-size: 16px;
            }
            .app-header .brand .story {
                font-size: 14px;
            }
            .btn {
                font-size: 10px;
                padding: 5px 10px;
            }
            .btn-icon {
                padding: 5px 8px;
                min-width: 30px;
                font-size: 13px;
            }
            .editor-wrapper textarea {
                padding: 1cm 1.2cm;
                font-size: 11.5pt;
            }
            .editor-toolbar {
                padding: 5px 10px;
                gap: 6px;
            }
            .editor-toolbar .stats {
                font-size: 10px;
                gap: 6px;
            }
            .editor-toolbar .toolbar-btn {
                font-size: 10px;
                padding: 3px 6px;
            }
            .app-footer {
                padding: 5px 12px;
                font-size: 10px;
                flex-direction: column;
                gap: 4px;
                text-align: center;
            }
            .hotkeys-hint {
                font-size: 9px;
                gap: 4px;
                justify-content: center;
            }
            body.focus-mode .editor-wrapper textarea {
                padding: 1.2cm 1.2cm;
                font-size: 13pt;
            }
            .find-replace-bar {
                padding: 6px 10px;
                font-size: 11px;
            }
            .find-replace-bar input {
                min-width: 80px;
                font-size: 11px;
            }
            .project-selector select {
                max-width: 100px;
                font-size: 10px;
                padding: 3px 6px;
            }
            .export-select {
                font-size: 10px;
                height: 26px;
                padding: 2px 6px;
            }
            .sidebar {
                width: 200px;
            }
            :root {
                --sidebar-width: 200px;
            }
            .sidebar.closed {
                width: 0;
            }
            .exit-focus-btn {
                top: 12px;
                right: 12px;
                padding: 6px 14px;
                font-size: 12px;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 4px 4px 0;
            }
            .app-header {
                padding: 6px 8px;
                border-radius: 12px;
            }
            .app-header .brand .family {
                font-size: 14px;
            }
            .app-header .brand .story {
                font-size: 12px;
            }
            .btn {
                font-size: 9px;
                padding: 4px 8px;
            }
            .btn-icon {
                padding: 4px 6px;
                min-width: 26px;
                font-size: 11px;
            }
            .editor-wrapper textarea {
                padding: 1cm 1cm;
                font-size: 11pt;
            }
            .editor-toolbar .stats {
                font-size: 9px;
                gap: 4px;
            }
            .editor-toolbar .toolbar-btn {
                font-size: 9px;
                padding: 2px 5px;
            }
            body.focus-mode .editor-wrapper textarea {
                padding: 0.8cm 0.8cm;
                font-size: 11pt;
            }
            .project-selector select {
                max-width: 80px;
                font-size: 9px;
                padding: 2px 4px;
            }
            .export-select {
                font-size: 9px;
                height: 24px;
                padding: 2px 4px;
            }
            .app-footer .copy {
                font-size: 9px;
            }
            .hotkeys-hint kbd {
                font-size: 8px;
                padding: 0 4px;
            }
            .sidebar {
                width: 160px;
            }
            :root {
                --sidebar-width: 160px;
            }
            .sidebar.closed {
                width: 0;
            }
            .exit-focus-btn {
                top: 8px;
                right: 8px;
                padding: 5px 12px;
                font-size: 11px;
            }
            .exit-focus-btn .shortcut {
                display: none;
            }
        }
    </style>
</head>
<body>

    <button class="exit-focus-btn" id="exitFocusBtn">
        ✕ Выйти из фокуса
        <span class="shortcut">Ctrl+F</span>
    </button>

    <header class="app-header">
        <div class="brand">
            <span class="story">STORYPHILIUM</span>
            <span class="separator">|</span>
            <span class="family">CINEPHILIUM FAMILY</span>
        </div>
        <div class="header-actions">
            <div class="project-selector">
                <select id="projectSelect"></select>
                <div class="project-actions">
                    <button class="btn btn-secondary btn-sm" id="newProjectBtn" title="Новый проект">+</button>
                    <button class="btn btn-secondary btn-sm" id="deleteProjectBtn" title="Удалить проект">✕</button>
                </div>
            </div>

            <div class="theme-selector">
                <select id="themeSelect">
                    <option value="cosmic">🌌 Космос</option>
                    <option value="espresso">☕ Эспрессо</option>
                    <option value="neural-white">⬜ Neural White</option>
                    <option value="emerald">🌿 Изумруд</option>
                    <option value="neural-blue">🔵 Neural Blue</option>
                </select>
            </div>

            <button class="btn btn-secondary btn-icon" id="focusToggle" title="Фокус (Ctrl+F)">◎</button>
            <button class="btn btn-secondary btn-icon" id="findToggle" title="Поиск/Замена (Ctrl+H)">🔍</button>
            <button class="btn btn-secondary btn-sm" id="undoBtn" title="Отменить (Ctrl+Z)">↩</button>
            <button class="btn btn-secondary btn-sm" id="redoBtn" title="Повторить (Ctrl+Y)">↪</button>
            <div style="display:flex; gap:4px; align-items:center;">
                <select id="exportFormat" class="export-select">
                    <option value="txt">TXT</option>
                    <option value="fountain" selected>Fountain</option>
                    <option value="json">JSON</option>
                    <option value="pdf">PDF</option>
                    <option value="html">🎨 HTML</option>
                </select>
                <button class="btn btn-primary btn-sm" id="exportBtn">📄 Экспорт</button>
            </div>
            <button class="btn btn-danger btn-sm" id="clearBtn">✕</button>
        </div>
    </header>

    <div class="editor-toolbar" id="editorToolbar">
        <div class="toolbar-group">
            <span class="group-label">Вставка</span>
            <button class="toolbar-btn" data-insert="НАР">НАР</button>
            <button class="toolbar-btn" data-insert="ИНТ">ИНТ</button>
            <button class="toolbar-btn" data-insert="ЭКСТ">ЭКСТ</button>
            <button class="toolbar-btn" data-insert="ПЕРС">Персонаж</button>
            <button class="toolbar-btn" data-insert="ДИАЛ">Диалог</button>
            <button class="toolbar-btn" data-insert="РЕМ">Ремарка</button>
            <button class="toolbar-btn" data-insert="СЦЕНА">Сцена #</button>
        </div>
        <div class="toolbar-group">
            <button class="toolbar-btn" id="toggleSidebarBtn" title="Показать/скрыть панель сцен и персонажей">📋</button>
        </div>
        <div class="spacer"></div>
        <div class="stats" id="statsBar">
            <span>📝 <span class="num" id="charCount">0</span></span>
            <span>📖 <span class="num" id="wordCount">0</span></span>
            <span>📃 <span class="num" id="lineCount">0</span></span>
            <span>📄 <span class="num" id="pageCount">0</span></span>
            <span>🎬 <span class="num" id="sceneCount">0</span></span>
            <span>👤 <span class="num" id="charactersCount">0</span></span>
            <span id="selectionStats" style="display:none;color:var(--accent);">
                ✦ <span class="num" id="selCharCount">0</span>
            </span>
        </div>
        <div class="status-indicator">
            <span class="status-dot saved" id="statusDot"></span>
            <span id="statusText">Сохранено</span>
        </div>
    </div>

    <div class="main-area">
        <div class="editor-wrapper">
            <textarea id="scriptInput" placeholder="Начните писать сценарий…&#10;Используйте Ctrl+S для сохранения, Ctrl+E для экспорта" spellcheck="true"></textarea>
        </div>
        <div class="sidebar closed" id="sidebar">
            <div class="sidebar-header">
                <span>Навигация</span>
                <button class="close-sidebar" id="closeSidebarBtn">✕</button>
            </div>
            <div class="sidebar-tabs">
                <button class="active" data-tab="scenes">Сцены</button>
                <button data-tab="characters">Персонажи</button>
            </div>
            <div class="sidebar-content">
                <div class="tab-pane active" id="tab-scenes">
                    <div id="sceneList"></div>
                </div>
                <div class="tab-pane" id="tab-characters">
                    <div id="characterList"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="find-replace-bar" id="findReplaceBar">
        <span class="fr-label">Найти</span>
        <input type="text" id="findInput" placeholder="текст…" />
        <span class="fr-label">Заменить</span>
        <input type="text" id="replaceInput" placeholder="заменить…" />
        <div class="fr-actions">
            <button class="btn btn-secondary btn-sm" id="findNextBtn">Найти →</button>
            <button class="btn btn-secondary btn-sm" id="replaceBtn">Заменить</button>
            <button class="btn btn-secondary btn-sm" id="replaceAllBtn">Все</button>
        </div>
        <button class="btn btn-sm btn-outline" id="closeFindBtn">✕</button>
    </div>

    <div class="print-content"></div>

    <footer class="app-footer">
        <span class="copy">
            STORYPHILIUM <span class="separator">|</span> <span class="family">CINEPHILIUM FAMILY</span> &copy; 2026
        </span>
        <div class="footer-right">
            <span class="timer" id="timerDisplay">⏱ 0:00:00</span>
            <span class="hotkeys-hint">
                <kbd>Ctrl+S</kbd> сохр <kbd>Ctrl+E</kbd> эксп <kbd>Ctrl+T</kbd> тема
                <kbd>Ctrl+F</kbd> фокус <kbd>Ctrl+H</kbd> поиск
            </span>
        </div>
    </footer>

    <script>
        (function() {
            'use strict';

            // ===== CONSTANTS =====
            const PROJECTS_KEY = 'storyphilium_pro_projects';
            const CURRENT_PROJECT_KEY = 'storyphilium_pro_current';
            const THEME_KEY = 'storyphilium_pro_theme';
            const FOCUS_KEY = 'storyphilium_pro_focus';
            const SIDEBAR_KEY = 'storyphilium_pro_sidebar';
            const MAX_HISTORY = 60;
            const DEBOUNCE_DELAY = 500;

            // ===== DOM REFS =====
            const textarea = document.getElementById('scriptInput');
            const charCount = document.getElementById('charCount');
            const wordCount = document.getElementById('wordCount');
            const lineCount = document.getElementById('lineCount');
            const pageCount = document.getElementById('pageCount');
            const sceneCount = document.getElementById('sceneCount');
            const charactersCount = document.getElementById('charactersCount');
            const selCharCount = document.getElementById('selCharCount');
            const selectionStats = document.getElementById('selectionStats');
            const statusDot = document.getElementById('statusDot');
            const statusText = document.getElementById('statusText');
            const timerDisplay = document.getElementById('timerDisplay');
            const exportBtn = document.getElementById('exportBtn');
            const exportFormat = document.getElementById('exportFormat');
            const clearBtn = document.getElementById('clearBtn');
            const themeSelect = document.getElementById('themeSelect');
            const focusToggle = document.getElementById('focusToggle');
            const exitFocusBtn = document.getElementById('exitFocusBtn');
            const findToggle = document.getElementById('findToggle');
            const findReplaceBar = document.getElementById('findReplaceBar');
            const findInput = document.getElementById('findInput');
            const replaceInput = document.getElementById('replaceInput');
            const findNextBtn = document.getElementById('findNextBtn');
            const replaceBtn = document.getElementById('replaceBtn');
            const replaceAllBtn = document.getElementById('replaceAllBtn');
            const closeFindBtn = document.getElementById('closeFindBtn');
            const undoBtn = document.getElementById('undoBtn');
            const redoBtn = document.getElementById('redoBtn');
            const projectSelect = document.getElementById('projectSelect');
            const newProjectBtn = document.getElementById('newProjectBtn');
            const deleteProjectBtn = document.getElementById('deleteProjectBtn');
            const printContent = document.querySelector('.print-content');
            const sidebar = document.getElementById('sidebar');
            const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
            const closeSidebarBtn = document.getElementById('closeSidebarBtn');
            const sceneList = document.getElementById('sceneList');
            const characterList = document.getElementById('characterList');
            const tabButtons = document.querySelectorAll('.sidebar-tabs button');
            const tabPanes = {
                scenes: document.getElementById('tab-scenes'),
                characters: document.getElementById('tab-characters')
            };

            // ===== STATE =====
            let saveTimer = null;
            let timerInterval = null;
            let startTime = Date.now();
            let elapsedSeconds = 0;
            let isFocus = localStorage.getItem(FOCUS_KEY) === 'true';
            let isSidebarOpen = localStorage.getItem(SIDEBAR_KEY) !== 'closed';
            let history = [];
            let historyIndex = -1;
            let isUndoRedo = false;
            let currentTheme = localStorage.getItem(THEME_KEY) || 'cosmic';

            // ===== PROJECTS MANAGEMENT =====
            function getProjects() {
                try {
                    const data = localStorage.getItem(PROJECTS_KEY);
                    return data ? JSON.parse(data) : {};
                } catch { return {}; }
            }

            function saveProjects(projects) {
                localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
            }

            function getCurrentProject() {
                return localStorage.getItem(CURRENT_PROJECT_KEY) || 'default';
            }

            function setCurrentProject(name) {
                localStorage.setItem(CURRENT_PROJECT_KEY, name);
            }

            function loadProject(name) {
                const projects = getProjects();
                const content = projects[name] || '';
                textarea.value = content;
                history = [content];
                historyIndex = 0;
                setCurrentProject(name);
                updateStats();
                saveScript(false);
                populateProjectSelect();
                projectSelect.value = name;
                statusText.textContent = `📁 ${name}`;
                setTimeout(() => { statusText.textContent = 'Сохранено'; }, 1500);
                updateSidebar();
            }

            function saveCurrentProject() {
                const name = getCurrentProject();
                const projects = getProjects();
                projects[name] = textarea.value;
                saveProjects(projects);
            }

            function createProject() {
                const name = prompt('Введите название нового проекта:', 'Новый сценарий');
                if (!name || name.trim() === '') return;
                const cleanName = name.trim();
                const projects = getProjects();
                if (projects[cleanName] !== undefined) {
                    alert('Проект с таким названием уже существует!');
                    return;
                }
                saveCurrentProject();
                projects[cleanName] = '';
                saveProjects(projects);
                loadProject(cleanName);
            }

            function deleteCurrentProject() {
                const name = getCurrentProject();
                if (name === 'default') {
                    alert('Нельзя удалить проект по умолчанию.');
                    return;
                }
                if (!confirm(`Удалить проект "${name}"? Это действие необратимо.`)) return;
                saveCurrentProject();
                const projects = getProjects();
                delete projects[name];
                saveProjects(projects);
                if (projects['default'] === undefined) {
                    projects['default'] = '';
                    saveProjects(projects);
                }
                loadProject('default');
            }

            function populateProjectSelect() {
                const projects = getProjects();
                const current = getCurrentProject();
                projectSelect.innerHTML = '';
                const names = Object.keys(projects);
                if (names.length === 0) {
                    projects['default'] = '';
                    saveProjects(projects);
                    names.push('default');
                }
                names.sort();
                for (const name of names) {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    if (name === current) option.selected = true;
                    projectSelect.appendChild(option);
                }
            }

            // ===== THEME =====
            function applyTheme(theme) {
                currentTheme = theme;
                document.documentElement.setAttribute('data-theme', theme);
                themeSelect.value = theme;
                localStorage.setItem(THEME_KEY, theme);
            }
            applyTheme(currentTheme);
            themeSelect.addEventListener('change', function() {
                applyTheme(this.value);
            });

            // ===== FOCUS =====
            function applyFocus(focus) {
                isFocus = focus;
                document.body.classList.toggle('focus-mode', focus);
                focusToggle.textContent = focus ? '◉' : '◎';
                exitFocusBtn.classList.toggle('visible', focus);
                localStorage.setItem(FOCUS_KEY, focus ? 'true' : 'false');
                if (focus) closeSidebar();
                if (focus) textarea.focus();
            }
            applyFocus(isFocus);
            focusToggle.addEventListener('click', () => applyFocus(!isFocus));
            exitFocusBtn.addEventListener('click', () => applyFocus(false));

            // ===== SIDEBAR =====
            function toggleSidebar() {
                if (isSidebarOpen) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            }

            function openSidebar() {
                isSidebarOpen = true;
                sidebar.classList.remove('closed');
                localStorage.setItem(SIDEBAR_KEY, 'open');
                updateSidebar();
            }

            function closeSidebar() {
                isSidebarOpen = false;
                sidebar.classList.add('closed');
                localStorage.setItem(SIDEBAR_KEY, 'closed');
            }

            toggleSidebarBtn.addEventListener('click', toggleSidebar);
            closeSidebarBtn.addEventListener('click', closeSidebar);

            if (!isSidebarOpen) {
                sidebar.classList.add('closed');
            } else {
                sidebar.classList.remove('closed');
            }

            // ===== SIDEBAR TABS =====
            tabButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    const tab = this.dataset.tab;
                    Object.keys(tabPanes).forEach(key => {
                        tabPanes[key].classList.toggle('active', key === tab);
                    });
                });
            });

            // ===== SIDEBAR CONTENT =====
            function parseScenes(text) {
                const lines = text.split('\n');
                const scenes = [];
                let sceneNum = 0;
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    const match = line.match(/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)\s*(.*)/i);
                    if (match) {
                        sceneNum++;
                        const heading = match[2] || '';
                        let desc = '';
                        for (let j = i + 1; j < lines.length; j++) {
                            const next = lines[j].trim();
                            if (next && !next.match(/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i) && !next.match(
                                    /^[А-ЯA-Z\s\-']+$/)) {
                                desc = next.substring(0, 60);
                                break;
                            }
                            if (next && next.match(/^[А-ЯA-Z\s\-']+$/)) break;
                        }
                        scenes.push({ num: sceneNum, heading: heading, desc: desc, lineIndex: i });
                    }
                }
                return scenes;
            }

            function parseCharacters(text) {
                const lines = text.split('\n');
                const chars = new Set();
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.length > 0 && trimmed === trimmed.toUpperCase() &&
                        !trimmed.startsWith('НАР.') && !trimmed.startsWith('ИНТ.') && !trimmed.startsWith('ЭКСТ.') &&
                        !trimmed.startsWith('NAR.') && !trimmed.startsWith('INT.') && !trimmed.startsWith('EXT.') &&
                        !trimmed.startsWith('(') && !trimmed.startsWith('[') &&
                        !trimmed.match(/^\d+\./) &&
                        trimmed.match(/^[А-ЯA-Z\s\-']+$/)) {
                        chars.add(trimmed);
                    }
                }
                return Array.from(chars).sort();
            }

            let updateSidebarTimer = null;

            function updateSidebar() {
                clearTimeout(updateSidebarTimer);
                updateSidebarTimer = setTimeout(() => {
                    const text = textarea.value;
                    const scenes = parseScenes(text);
                    sceneList.innerHTML = '';
                    if (scenes.length === 0) {
                        sceneList.innerHTML = '<div class="sidebar-empty">Нет сцен</div>';
                    } else {
                        for (const sc of scenes) {
                            const div = document.createElement('div');
                            div.className = 'sidebar-item';
                            div.innerHTML = `
                                <span class="item-num">${sc.num}</span>
                                <span class="item-name">${sc.heading || 'Сцена'}</span>
                                ${sc.desc ? `<span class="item-desc">${sc.desc}</span>` : ''}
                            `;
                            div.addEventListener('click', () => {
                                const lines = text.split('\n');
                                let pos = 0;
                                for (let i = 0; i < sc.lineIndex && i < lines.length; i++) {
                                    pos += lines[i].length + 1;
                                }
                                textarea.focus();
                                textarea.setSelectionRange(pos, pos);
                                const computedLH = getComputedStyle(textarea).lineHeight;
                                let lineHeight = parseFloat(computedLH);
                                if (isNaN(lineHeight)) lineHeight = 30;
                                textarea.scrollTop = sc.lineIndex * lineHeight - 100;
                            });
                            sceneList.appendChild(div);
                        }
                    }

                    const chars = parseCharacters(text);
                    characterList.innerHTML = '';
                    if (chars.length === 0) {
                        characterList.innerHTML = '<div class="sidebar-empty">Нет персонажей</div>';
                    } else {
                        for (const ch of chars) {
                            const div = document.createElement('div');
                            div.className = 'sidebar-item';
                            div.innerHTML = `<span class="item-name">${ch}</span>`;
                            div.addEventListener('click', () => {
                                const index = text.indexOf(ch);
                                if (index !== -1) {
                                    textarea.focus();
                                    textarea.setSelectionRange(index, index + ch.length);
                                    const lines = text.substring(0, index).split('\n');
                                    const computedLH = getComputedStyle(textarea).lineHeight;
                                    let lineHeight = parseFloat(computedLH);
                                    if (isNaN(lineHeight)) lineHeight = 30;
                                    textarea.scrollTop = (lines.length - 1) * lineHeight - 50;
                                }
                            });
                            characterList.appendChild(div);
                        }
                    }
                }, DEBOUNCE_DELAY);
            }

            // ===== TIMER =====
            function updateTimer() {
                const total = Math.floor((Date.now() - startTime) / 1000) + elapsedSeconds;
                const h = String(Math.floor(total / 3600)).padStart(2, '0');
                const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
                const s = String(total % 60).padStart(2, '0');
                timerDisplay.textContent = `⏱ ${h}:${m}:${s}`;
            }

            function startTimer() {
                startTime = Date.now();
                clearInterval(timerInterval);
                timerInterval = setInterval(updateTimer, 1000);
                updateTimer();
            }
            startTimer();

            // ===== HISTORY =====
            function pushHistory() {
                if (isUndoRedo) return;
                const current = textarea.value;
                if (history.length > 0 && history[historyIndex] === current) return;
                history = history.slice(0, historyIndex + 1);
                history.push(current);
                if (history.length > MAX_HISTORY) {
                    history.shift();
                }
                historyIndex = history.length - 1;
            }

            function undo() {
                if (historyIndex <= 0) return;
                isUndoRedo = true;
                historyIndex--;
                textarea.value = history[historyIndex];
                textarea.dispatchEvent(new Event('input'));
                isUndoRedo = false;
                updateStats();
                updateSidebar();
            }

            function redo() {
                if (historyIndex >= history.length - 1) return;
                isUndoRedo = true;
                historyIndex++;
                textarea.value = history[historyIndex];
                textarea.dispatchEvent(new Event('input'));
                isUndoRedo = false;
                updateStats();
                updateSidebar();
            }

            // ===== STATS =====
            function updateStats() {
                const text = textarea.value;
                const chars = text.length;
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                const lines = text ? text.split('\n').length : 0;
                const pages = Math.max(1, Math.ceil(chars / 1000));
                const sceneMatches = text.match(/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/gim);
                const scenes = sceneMatches ? sceneMatches.length : 0;
                const linesArr = text.split('\n');
                let charNames = new Set();
                for (let line of linesArr) {
                    const trimmed = line.trim();
                    if (trimmed.length > 0 && trimmed === trimmed.toUpperCase() &&
                        !trimmed.startsWith('НАР.') && !trimmed.startsWith('ИНТ.') && !trimmed.startsWith('ЭКСТ.') &&
                        !trimmed.startsWith('NAR.') && !trimmed.startsWith('INT.') && !trimmed.startsWith('EXT.') &&
                        !trimmed.startsWith('(') && !trimmed.startsWith('[') &&
                        !trimmed.match(/^\d+\./) &&
                        trimmed.match(/^[А-ЯA-Z\s\-']+$/)) {
                        charNames.add(trimmed);
                    }
                }
                charCount.textContent = chars;
                wordCount.textContent = words;
                lineCount.textContent = lines;
                pageCount.textContent = pages;
                sceneCount.textContent = scenes;
                charactersCount.textContent = charNames.size;

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                if (start !== end) {
                    const sel = text.substring(start, end);
                    selCharCount.textContent = sel.length;
                    selectionStats.style.display = 'inline';
                } else {
                    selectionStats.style.display = 'none';
                }
            }

            let statsTimer = null;

            function scheduleStatsUpdate() {
                clearTimeout(statsTimer);
                statsTimer = setTimeout(() => {
                    updateStats();
                    updateSidebar();
                }, 200);
            }

            // ===== SAVE =====
            function saveScript(showFeedback = true) {
                saveCurrentProject();
                if (showFeedback) {
                    statusDot.className = 'status-dot saved';
                    statusText.textContent = 'Сохранено';
                    setTimeout(() => {
                        statusDot.className = 'status-dot saved';
                    }, 2000);
                }
                pushHistory();
                updateStats();
                updateSidebar();
            }

            function triggerAutoSave() {
                clearTimeout(saveTimer);
                statusDot.className = 'status-dot saving';
                statusText.textContent = 'Сохранение…';
                saveTimer = setTimeout(() => saveScript(true), 1000);
            }

            // ===== LOAD DEFAULT =====
            function loadDefaultScript() {
                return `НАР. КВАРТИРА ИВАНА - ДЕНЬ

        Иван сидит на диване, смотрит в стену. За окном шумят машины.

        ИВАН
        (вздыхая)
        Опять этот кошмар. Сколько можно?

        Он встаёт, подходит к окну.

        ИНТ. КАФЕ "У КОФЕЙНИ" - УТРО

        В кафе тихо играет джаз. Ольга и Дмитрий сидят за столиком у окна.

        ОЛЬГА
        Ты сегодня какой-то задумчивый.

        ДМИТРИЙ
        Просто мысли. Много мыслей.

        Ольга помешивает кофе, смотрит на Дмитрия.

        ОЛЬГА
        Рассказывай. Я слушаю.

        ДМИТРИЙ
        (пауза)
        Не знаю, с чего начать.

        ИНТ. ОФИС - ДЕНЬ

        Андрей печатает на клавиатуре. Входит Наталья.

        НАТАЛЬЯ
        Андрей, проект готов?

        АНДРЕЙ
        Почти. Ещё пара штрихов.

        НАТАЛЬЯ
        Хорошо. Жду.`;
            }

            function initProjects() {
                let projects = getProjects();
                if (Object.keys(projects).length === 0) {
                    projects['default'] = loadDefaultScript();
                    saveProjects(projects);
                }
                populateProjectSelect();
                const current = getCurrentProject();
                if (!projects[current]) {
                    setCurrentProject('default');
                }
                const content = projects[getCurrentProject()] || '';
                textarea.value = content;
                history = [content];
                historyIndex = 0;
                updateStats();
                saveScript(false);
                projectSelect.value = getCurrentProject();
                updateSidebar();
            }

            // ===== EXPORT HTML =====
            function generateHTML(content, projectName) {
                const now = new Date();
                const dateStr = now.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                const safeProjectName = projectName.replace(/[&<>"]/g, function(m) {
                    if (m === '&') return '&amp;';
                    if (m === '<') return '&lt;';
                    if (m === '>') return '&gt;';
                    if (m === '"') return '&quot;';
                    return m;
                });
                const safeDate = dateStr.replace(/[&<>"]/g, function(m) {
                    if (m === '&') return '&amp;';
                    if (m === '<') return '&lt;';
                    if (m === '>') return '&gt;';
                    if (m === '"') return '&quot;';
                    return m;
                });

                const lines = content.split('\n');
                const htmlLines = [];

                function isSceneHeading(line) {
                    return /^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)\s*/i.test(line);
                }

                function isParenthetical(line) {
                    return /^\([^)]*\)$/.test(line.trim());
                }

                function isCharacterName(line) {
                    const trimmed = line.trim();
                    if (trimmed.length === 0) return false;
                    if (trimmed !== trimmed.toUpperCase()) return false;
                    if (/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)/i.test(trimmed)) return false;
                    if (/^\([^)]*\)$/.test(trimmed)) return false;
                    if (/^\d/.test(trimmed)) return false;
                    if (/^[\(\[\{]/.test(trimmed)) return false;
                    if (!/^[А-ЯA-Z\s\-']+$/.test(trimmed)) return false;
                    return true;
                }

                let state = 'none';

                for (let i = 0; i < lines.length; i++) {
                    const rawLine = lines[i];
                    const trimmed = rawLine.trim();

                    if (trimmed.length === 0) {
                        htmlLines.push('<div class="empty-line"></div>');
                        state = 'none';
                        continue;
                    }

                    const safeTrimmed = trimmed.replace(/[&<>"]/g, function(m) {
                        if (m === '&') return '&amp;';
                        if (m === '<') return '&lt;';
                        if (m === '>') return '&gt;';
                        if (m === '"') return '&quot;';
                        return m;
                    });

                    if (isSceneHeading(trimmed)) {
                        const match = trimmed.match(/^(НАР\.|ИНТ\.|ЭКСТ\.|NAR\.|INT\.|EXT\.)\s*(.*)/i);
                        const prefix = match ? match[1].toUpperCase() : '';
                        const rest = match ? match[2] || '' : trimmed;
                        const safeRest = rest.replace(/[&<>"]/g, function(m) {
                            if (m === '&') return '&amp;';
                            if (m === '<') return '&lt;';
                            if (m === '>') return '&gt;';
                            if (m === '"') return '&quot;';
                            return m;
                        });
                        htmlLines.push(`<div class="scene-heading">${prefix} ${safeRest}</div>`);
                        state = 'none';
                        continue;
                    }

                    if (isParenthetical(trimmed)) {
                        htmlLines.push(`<div class="parenthetical">${safeTrimmed}</div>`);
                        continue;
                    }

                    if (isCharacterName(trimmed)) {
                        htmlLines.push(`<div class="character">${safeTrimmed}</div>`);
                        state = 'character';
                        continue;
                    }

                    if (state === 'character') {
                        htmlLines.push(`<div class="dialogue">${safeTrimmed}</div>`);
                        continue;
                    }

                    htmlLines.push(`<div class="action">${safeTrimmed}</div>`);
                    state = 'none';
                }

                return `<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${safeProjectName} — Сценарий</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Lora', 'Times New Roman', serif;
                    background: #f8f6f2;
                    color: #1e1e1e;
                    padding: 40px 20px;
                    display: flex;
                    justify-content: center;
                    line-height: 1.6;
                }
                .script-container {
                    max-width: 1000px;
                    width: 100%;
                    background: #ffffff;
                    padding: 60px 80px;
                    box-shadow: 0 8px 48px rgba(0,0,0,0.06);
                    border-radius: 12px;
                    position: relative;
                }
                .title-block {
                    text-align: center;
                    margin-bottom: 50px;
                    padding-bottom: 30px;
                    border-bottom: 2px solid #e8e0d6;
                    position: relative;
                }
                .title-block h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 36px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    color: #1a1a1a;
                    margin-bottom: 6px;
                }
                .title-block .subtitle {
                    font-family: 'Playfair Display', serif;
                    font-size: 16px;
                    font-weight: 400;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: #8a7a6a;
                    margin-top: 4px;
                }
                .title-block .date {
                    font-size: 14px;
                    color: #b0a090;
                    margin-top: 10px;
                    letter-spacing: 1px;
                }
                .title-block .decor-line {
                    width: 80px;
                    height: 2px;
                    background: #c0b0a0;
                    margin: 16px auto 0;
                }

                .scene-heading {
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    font-size: 16px;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin: 32px 0 12px 0;
                    padding: 6px 0 4px 0;
                    border-bottom: 1px solid #ece6de;
                    color: #2c2c2c;
                }
                .action {
                    font-size: 15px;
                    line-height: 1.7;
                    margin: 8px 0 8px 0;
                    color: #2a2a2a;
                    padding-left: 0;
                }
                .character {
                    font-family: 'Playfair Display', serif;
                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin: 20px 0 4px 0;
                    color: #1a1a1a;
                    padding-left: 40%;
                }
                .parenthetical {
                    font-style: italic;
                    color: #6a5a4a;
                    font-size: 14px;
                    margin: 2px 0 4px 0;
                    padding-left: 30%;
                }
                .dialogue {
                    font-size: 15px;
                    line-height: 1.8;
                    margin: 2px 0 2px 0;
                    padding-left: 30%;
                    max-width: 70%;
                    color: #1a1a1a;
                }
                .empty-line {
                    height: 14px;
                }

                @page { margin: 2.5cm 2cm; }
                .page-break { page-break-after: always; border-bottom: 1px dashed #ddd; margin: 30px 0; }

                @media print {
                    body { background: white; padding: 0; }
                    .script-container { box-shadow: none; border-radius: 0; padding: 0; max-width: 100%; }
                    .title-block { border-bottom-color: #ccc; }
                    .page-break { border-bottom: none; page-break-after: always; }
                    .scene-heading { border-bottom-color: #ccc; }
                }

                @media (max-width: 600px) {
                    .script-container { padding: 30px 20px; }
                    .character { padding-left: 20%; }
                    .parenthetical { padding-left: 15%; }
                    .dialogue { padding-left: 15%; max-width: 85%; }
                    .title-block h1 { font-size: 28px; }
                }
            </style>
        </head>
        <body>
            <div class="script-container">
                <div class="title-block">
                    <h1>${safeProjectName}</h1>
                    <div class="subtitle">СЦЕНАРИЙ</div>
                    <div class="date">${safeDate}</div>
                    <div class="decor-line"></div>
                </div>
                ${htmlLines.join('\n')}
            </div>
        </body>
        </html>`;
            }

            function exportHTML() {
                const content = textarea.value;
                if (!content.trim()) {
                    alert('Сценарий пуст.');
                    return;
                }
                const projectName = getCurrentProject();
                const now = new Date();
                const dateStr =
                    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
                const html = generateHTML(content, projectName);
                const blob = new Blob(['\uFEFF' + html], { type: 'text/html;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${projectName}_${dateStr}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
                statusText.textContent = '✅ HTML экспортирован!';
                setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
            }

            // ===== EXPORT =====
            function getExportContent() {
                return textarea.value;
            }

            function addBOM(content) {
                return '\uFEFF' + content;
            }

            function downloadFile(content, filename, mimeType) {
                const isText = mimeType.includes('text/plain') || mimeType.includes('application/json') || mimeType.includes(
                    'text/html');
                const finalContent = isText ? addBOM(content) : content;
                const blob = new Blob([finalContent], { type: mimeType });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            }

            function exportTXT() {
                const content = getExportContent();
                if (!content.trim()) { alert('Сценарий пуст.'); return; }
                const projectName = getCurrentProject();
                const now = new Date();
                const dateStr =
                    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
                downloadFile(content, `${projectName}_${dateStr}.txt`, 'text/plain;charset=utf-8');
                statusText.textContent = '✅ TXT экспортирован!';
                setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
            }

            function exportFountain() {
                const content = getExportContent();
                if (!content.trim()) { alert('Сценарий пуст.'); return; }
                const projectName = getCurrentProject();
                const now = new Date();
                const dateStr =
                    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
                const fountainContent = `Title: ${projectName}\nCredit: Storyphilium\nDate: ${dateStr}\n\n` + content;
                downloadFile(fountainContent, `${projectName}_${dateStr}.fountain`, 'text/plain;charset=utf-8');
                statusText.textContent = '✅ Fountain экспортирован!';
                setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
            }

            function exportJSON() {
                const content = getExportContent();
                const projectName = getCurrentProject();
                const now = new Date();
                const data = { project: projectName, content: content, exportedAt: now.toISOString(), version: '1.0',
                    format: 'storyphilium' };
                const json = JSON.stringify(data, null, 2);
                const dateStr =
                    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
                downloadFile(json, `${projectName}_${dateStr}.json`, 'application/json;charset=utf-8');
                statusText.textContent = '✅ JSON экспортирован!';
                setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
            }

            function exportPDF() {
                const content = getExportContent();
                if (!content.trim()) { alert('Сценарий пуст.'); return; }
                printContent.textContent = content;
                window.print();
            }

            window.addEventListener('afterprint', function() {
                if (printContent.textContent) {
                    printContent.textContent = '';
                    statusText.textContent = '✅ PDF отправлен на печать';
                    setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
                }
            });

            function handleExport() {
                const format = exportFormat.value;
                switch (format) {
                    case 'txt':
                        exportTXT();
                        break;
                    case 'fountain':
                        exportFountain();
                        break;
                    case 'json':
                        exportJSON();
                        break;
                    case 'pdf':
                        exportPDF();
                        break;
                    case 'html':
                        exportHTML();
                        break;
                    default:
                        alert('Неизвестный формат');
                }
            }
            exportBtn.addEventListener('click', handleExport);

            // ===== CLEAR =====
            function clearScript() {
                if (textarea.value.trim() === '') return;
                if (!confirm('Удалить весь текст сценария?')) return;
                textarea.value = '';
                saveScript(true);
                textarea.focus();
                updateStats();
                updateSidebar();
            }
            clearBtn.addEventListener('click', clearScript);

            // ===== FIND / REPLACE =====
            let lastFindIndex = -1;

            function findNext() {
                const query = findInput.value;
                if (!query) return;
                const text = textarea.value;
                const start = textarea.selectionEnd;
                let idx = text.indexOf(query, start);
                if (idx === -1) idx = text.indexOf(query);
                if (idx === -1) {
                    statusText.textContent = '❌ Не найдено';
                    setTimeout(() => { statusText.textContent = 'Сохранено'; }, 1500);
                    return;
                }
                textarea.setSelectionRange(idx, idx + query.length);
                textarea.focus();
                lastFindIndex = idx;
            }

            function replaceCurrent() {
                const query = findInput.value;
                const replacement = replaceInput.value;
                if (!query) return;
                const text = textarea.value;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                if (start === end || text.substring(start, end) !== query) { findNext(); return; }
                const before = text.substring(0, start);
                const after = text.substring(end);
                textarea.value = before + replacement + after;
                const newPos = start + replacement.length;
                textarea.setSelectionRange(newPos, newPos);
                textarea.dispatchEvent(new Event('input'));
                triggerAutoSave();
                updateStats();
                updateSidebar();
            }

            function replaceAll() {
                const query = findInput.value;
                const replacement = replaceInput.value;
                if (!query) return;
                const text = textarea.value;
                const newText = text.split(query).join(replacement);
                if (newText !== text) {
                    textarea.value = newText;
                    textarea.dispatchEvent(new Event('input'));
                    triggerAutoSave();
                    updateStats();
                    updateSidebar();
                    const count = text.split(query).length - 1;
                    statusText.textContent = `✅ Заменено ${count}`;
                    setTimeout(() => { statusText.textContent = 'Сохранено'; }, 2000);
                } else {
                    statusText.textContent = '❌ Ничего не найдено';
                    setTimeout(() => { statusText.textContent = 'Сохранено'; }, 1500);
                }
            }

            findToggle.addEventListener('click', () => {
                findReplaceBar.classList.toggle('open');
                if (findReplaceBar.classList.contains('open')) findInput.focus();
            });
            closeFindBtn.addEventListener('click', () => findReplaceBar.classList.remove('open'));
            findNextBtn.addEventListener('click', findNext);
            replaceBtn.addEventListener('click', replaceCurrent);
            replaceAllBtn.addEventListener('click', replaceAll);
            findInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault();
                    findNext(); } });
            replaceInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault();
                    replaceCurrent(); } });

            // ===== INSERT ELEMENTS =====
            function insertElement(type) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const before = text.substring(0, start);
                const after = text.substring(end);
                let insert = '';
                let cursorOffset = 0;
                switch (type) {
                    case 'НАР':
                        insert = 'НАР.  - ДЕНЬ\n\n';
                        cursorOffset = insert.length;
                        break;
                    case 'ИНТ':
                        insert = 'ИНТ.  - ДЕНЬ\n\n';
                        cursorOffset = insert.length;
                        break;
                    case 'ЭКСТ':
                        insert = 'ЭКСТ.  - ДЕНЬ\n\n';
                        cursorOffset = insert.length;
                        break;
                    case 'ПЕРС':
                        insert = '\n\nПЕРСОНАЖ\n';
                        cursorOffset = insert.length;
                        break;
                    case 'ДИАЛ':
                        insert = '\n(диалог)\n';
                        cursorOffset = insert.length;
                        break;
                    case 'РЕМ':
                        insert = '\n(ремарка)\n';
                        cursorOffset = insert.length;
                        break;
                    case 'СЦЕНА':
                        const sceneNum = (textarea.value.match(/^(\d+)\./gm) || []).length + 1;
                        insert = `\n${sceneNum}.  \n\n`;
                        cursorOffset = insert.length;
                        break;
                    default:
                        return;
                }
                textarea.value = before + insert + after;
                const newPos = start + cursorOffset;
                textarea.setSelectionRange(newPos, newPos);
                textarea.focus();
                textarea.dispatchEvent(new Event('input'));
                triggerAutoSave();
                updateStats();
                updateSidebar();
            }

            document.querySelectorAll('[data-insert]').forEach(btn => {
                btn.addEventListener('click', () => insertElement(btn.dataset.insert));
            });

            // ===== PROJECT EVENTS =====
            projectSelect.addEventListener('change', function() {
                const name = this.value;
                if (name) {
                    saveCurrentProject();
                    loadProject(name);
                }
            });
            newProjectBtn.addEventListener('click', createProject);
            deleteProjectBtn.addEventListener('click', deleteCurrentProject);

            // ===== UNDO / REDO =====
            undoBtn.addEventListener('click', undo);
            redoBtn.addEventListener('click', redo);

            // ===== KEYBOARD SHORTCUTS =====
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    saveScript(true);
                    statusText.textContent = '✅ Сохранено!';
                    setTimeout(() => { statusText.textContent = 'Сохранено'; }, 1500);
                    return;
                }
                if (e.ctrlKey && e.key === 'e') {
                    e.preventDefault();
                    handleExport();
                    return;
                }
                if (e.ctrlKey && e.key === 't') {
                    e.preventDefault();
                    const themes = ['cosmic', 'espresso', 'neural-white', 'emerald', 'neural-blue'];
                    let idx = themes.indexOf(currentTheme);
                    idx = (idx + 1) % themes.length;
                    applyTheme(themes[idx]);
                    return;
                }
                if (e.ctrlKey && e.key === 'f') {
                    e.preventDefault();
                    applyFocus(!isFocus);
                    return;
                }
                if (e.ctrlKey && e.key === 'h') {
                    e.preventDefault();
                    findReplaceBar.classList.toggle('open');
                    if (findReplaceBar.classList.contains('open')) { findInput.focus();
                        findInput.select(); }
                    return;
                }
                if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    undo();
                    return;
                }
                if (e.ctrlKey && e.key === 'y') {
                    e.preventDefault();
                    redo();
                    return;
                }
                if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
                    e.preventDefault();
                    redo();
                    return;
                }
                if (e.ctrlKey && !e.shiftKey && e.key >= '1' && e.key <= '7') {
                    e.preventDefault();
                    const map = { '1': 'НАР', '2': 'ИНТ', '3': 'ЭКСТ', '4': 'ПЕРС', '5': 'ДИАЛ', '6': 'РЕМ', '7': 'СЦЕНА' };
                    insertElement(map[e.key]);
                    return;
                }
            });

            // ===== EVENTS ON TEXTAREA =====
            textarea.addEventListener('input', function() {
                triggerAutoSave();
                scheduleStatsUpdate();
            });
            textarea.addEventListener('blur', function() {
                clearTimeout(saveTimer);
                saveScript(true);
            });
            textarea.addEventListener('select', updateStats);
            textarea.addEventListener('click', updateStats);

            // ===== INIT =====
            initProjects();

            window.addEventListener('beforeunload', function() {
                saveCurrentProject();
            });

            console.log('📝 Storyphilium Pro — сценарный редактор');
            console.log('☕ Темы: Космос, Эспрессо, Neural White, Изумруд, Neural Blue');
            console.log('🎨 Улучшенный HTML-экспорт с красивой вёрсткой и исправленными диалогами!');
            console.log('⌨️  Ctrl+1..7 — вставка элементов');
            console.log('🔲 Кнопка выхода из фокус-режима появляется в правом верхнем углу');

        })();
    </script>

</body>
</html>
