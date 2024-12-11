'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' :
                                            'id="xs-controllers-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' :
                                        'id="xs-injectables-links-module-AuthModule-80334670ef48943c3232696f0341c5fc1e5a093c2b3d7fe81793ac6547c689e8a5538e99d3245c8c6cead4055b265efa719bccce38874afa57eeacebb668d687"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GithubAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GithubStratergy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GithubStratergy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStratergy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStratergy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionSerializer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionSerializer</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-9a32edb8a022b155cafdbdbd735907b877c70c4532f96ba0c54de6662a3e9892442be83ca134861f177119b71750dbf51d25152dca2f7fc1715ce87badf26a51"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-9a32edb8a022b155cafdbdbd735907b877c70c4532f96ba0c54de6662a3e9892442be83ca134861f177119b71750dbf51d25152dca2f7fc1715ce87badf26a51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-9a32edb8a022b155cafdbdbd735907b877c70c4532f96ba0c54de6662a3e9892442be83ca134861f177119b71750dbf51d25152dca2f7fc1715ce87badf26a51"' :
                                        'id="xs-injectables-links-module-UsersModule-9a32edb8a022b155cafdbdbd735907b877c70c4532f96ba0c54de6662a3e9892442be83ca134861f177119b71750dbf51d25152dca2f7fc1715ce87badf26a51"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GResponse.html" data-type="entity-link" >GResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationException.html" data-type="entity-link" >ValidationException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZodValidationPipe.html" data-type="entity-link" >ZodValidationPipe</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});