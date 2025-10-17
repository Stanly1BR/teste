/* Melhorias para as partículas */
#particles-js {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--primary);
    pointer-events: none;
}

/* Garantir que o conteúdo fique acima das partículas */
header,
section,
footer {
    position: relative;
    z-index: 1;
}

/* Performance para dispositivos móveis */
@media (max-width: 768px) {
    #particles-js {
        opacity: 0.7;
    }
}

/* Desabilitar partículas em dispositivos com pouca performance */
@media (max-width: 480px) and (prefers-reduced-motion: reduce) {
    #particles-js {
        display: none;
    }
}