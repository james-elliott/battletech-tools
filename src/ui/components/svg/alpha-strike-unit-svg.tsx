import React from 'react';
import { AlphaStrikeUnit } from '../../../classes/alpha-strike-unit';
import { IASPilotAbility } from '../../../data/alpha-strike-pilot-abilities';
import { IASSpecialAbility } from '../../../data/alpha-strike-special-abilities';
import { IAppGlobals } from '../../app-router';
import BattleTechLogo from '../battletech-logo';
import './alpha-strike-card-svg.scss';
import { OpForBehavior } from '../../../data/bryms-opfor-behaviors';
import { FaArrowDown, FaArrowUp, FaDiceD6 } from "react-icons/fa";

export default class AlphaStrikeUnitSVG extends React.Component<IAlphaStrikeUnitSVGProps, IAlphaStrikeUnitSVGState> {
    height: string = "100%";
    width: string = "auto";
    damageLeftBase = 0;
    buttonRadius = 11;

    critLineHeight = 50;

    constructor(props: IAlphaStrikeUnitSVGProps) {
        super(props);
        this.state = {
            showTakeDamage: false,
            showMovementOptions: false,
        }
        if( this.props.height ) {
            this.height = this.props.height;
        }

        if( this.props.width ) {
            this.width = this.props.width;
        }

        this.damageLeftBase = 0;
        if( this.props.inPlay ) {
            this.damageLeftBase = 40;
        }
    }

    private _toggleTakeDamage = () => {
        this.setState({
            showTakeDamage: !this.state.showTakeDamage,
        })
    }

    private _toggleMovementOptions = () => {
        this.setState({
            showMovementOptions: !this.state.showMovementOptions,
        })
    }

    private _takeDamage = ( damageTaken: number ): void => {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.takeDamage( damageTaken );
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
        this.setState({
            showTakeDamage: false,
        })
    }

    private _toggleArmorOrStructure = ( target: string, indexNumber: number ) => {
        if( this.props.inPlay && this.props.asUnit ) {
            if( target === "armor" ) {
                if( this.props.asUnit.roundArmor.length > indexNumber) {
                    this.props.asUnit.roundArmor[indexNumber] = !this.props.asUnit.roundArmor[indexNumber];
                }

            } else {
                if( this.props.asUnit.roundStructure.length > indexNumber) {
                    this.props.asUnit.roundStructure[indexNumber] = !this.props.asUnit.roundStructure[indexNumber];
                }
            }
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
    }

    private _toggleEngineHit = (  indexNumber: number ) => {
        if( this.props.inPlay && this.props.asUnit ) {
            if( this.props.asUnit.roundEngineHits.length > indexNumber) {
                this.props.asUnit.roundEngineHits[indexNumber] = !this.props.asUnit.roundEngineHits[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _setHeat = ( newValue: number ) => {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.setHeat(newValue);
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
    }

    private _toggleWeaponHit = (indexNumber: number ): void =>  {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.roundWeaponHits.length > indexNumber) {
                this.props.asUnit.roundWeaponHits[indexNumber] = !this.props.asUnit.roundWeaponHits[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _toggleVehicle910 = (indexNumber: number ): void =>  {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.roundVehicleMotive910.length > indexNumber) {
                this.props.asUnit.roundVehicleMotive910[indexNumber] = !this.props.asUnit.roundVehicleMotive910[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _toggleVehicle11 = (indexNumber: number ): void =>  {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.roundVehicleMotive11.length > indexNumber) {
                this.props.asUnit.roundVehicleMotive11[indexNumber] = !this.props.asUnit.roundVehicleMotive11[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _toggleVehicle12 = (): void => {
        if( this.props.inPlay && this.props.asUnit ) {

            this.props.asUnit.roundVehicleMotive12 = !this.props.asUnit.roundVehicleMotive12;
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );

        }
    }

    private _toggleFireControlHit = (indexNumber: number ): void => {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.roundFireControlHits.length > indexNumber) {
                this.props.asUnit.roundFireControlHits[indexNumber] = !this.props.asUnit.roundFireControlHits[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _toggleMPHit = (indexNumber: number ): void => {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.roundMpControlHits.length > indexNumber) {
                this.props.asUnit.roundMpControlHits[indexNumber] = !this.props.asUnit.roundMpControlHits[indexNumber];
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    private _changeAltitude = (change: number = 0): void => {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.altitude = this.props.asUnit.altitude + change;
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
    }

    private _ApplyRound = (): void => {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.applyRound();
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
    }

    private _showPilotAbility = (
        e: React.MouseEvent<SVGTextElement, MouseEvent>,
        ability: IASPilotAbility | null,
    ) => {
        if( e && e.preventDefault ) e.preventDefault();

        if( this.props.showPilotAbility && ability ) {
            this.props.showPilotAbility( ability );
        }
    }

    private _makeArmorDots = (
        target: string = "armor",
    ): JSX.Element[] => {
        let dots: JSX.Element[] = []
        // We reduce the number of dots per row to accommodate a threshold number
        let maxCountInRow = this.props.asUnit && this.props.asUnit.threshold!==0 ? 14 : 16;
        if (!this.props.inPlay) {
            maxCountInRow = maxCountInRow + 2;
        }
        // If armor is more than 1 row, nudge the display upwards to make room for both above the structure.
        let yLoc = target === "armor" && this.props.asUnit && this.props.asUnit.armor > maxCountInRow ? -22 : -11;

        let xLoc = this.props.inPlay ? 4 : 44;
        let radius = this.buttonRadius;

        let dotArray: boolean[] = [];
        let roundDotArray: boolean[] = [];
        if (this.props.asUnit) {
            if (target === "armor") {
                dotArray = this.props.asUnit.currentArmor;
                roundDotArray = this.props.asUnit.roundArmor;
            } else {
                dotArray = this.props.asUnit.currentStructure;
                roundDotArray = this.props.asUnit.roundStructure;
            }
        }

        let dotsInRow = 0;
        dotArray.map( (point, pointIndex) => {
            let classes = ["dot"];
            classes.push(target);
            if (roundDotArray[pointIndex]) {
                classes.push("staged");
            }
            if (point) {
                classes.push("active");
            }

            dots.push(
                <React.Fragment key={pointIndex}>
                    <circle className={classes.join(" ")}
                        cx={this.damageLeftBase + xLoc + (dotsInRow * (radius * 2 + radius/2)) }
                        cy={yLoc}
                        r={radius}
                        onClick={() => this._toggleArmorOrStructure( target, pointIndex )}
                    />
                </React.Fragment>
            )

            if (dotsInRow >= maxCountInRow - 1) {
                yLoc = 4;
                dotsInRow = 0;
            } else {
                dotsInRow++;
            }

            return null;
        })

        return dots;
    }

    // Function that creates a movement counter
    private _movementCounter = (
        cx1: number = 362, 
        cy1: number = -37, 
        cSize: number = 50,
        key = "?",
        toggle: Boolean = true
    ): JSX.Element => {

        // Plot out the hexagon's points relative to the starting position and size.
        let cx2 = cx1 + cSize*.5;
        let cy2 = cy1 + 0;
        let cx3 = cx1 + cSize*.75;
        let cy3 = cy1 + cSize*.4;
        let cx4 = cx1 + cSize*.5;
        let cy4 = cy1 + cSize*.8;
        let cx5 = cx1 + 0;
        let cy5 = cy1 + cSize*.8;
        let cx6 = cx1 - cSize*.25;
        let cy6 = cy1 + cSize*.4;

        // Concatenate into a string for the SVG
        let points = cx1 + "," + cy1 + " " + cx2 + "," + cy2 + " " + cx3 + "," + cy3 + " " + cx4 + "," + cy4 + " " + cx5 + "," + cy5 + " " + cx6 + "," + cy6;

        // Calculate the size and placement for text
        let text = "?";
        let textX = cx1 + cSize*.25;
        let textY = cy1 + cSize*.5 + cSize*.1;
        let textSize = cSize * .6;
        let classes = "cursor-pointer move-token";


        // Separate concerns, is this a toggle? is this set already?
        if (toggle && this.props && this.props.asUnit && this.props.asUnit.movementType) {
            text = this.props.asUnit.movementType.charAt(0).toUpperCase();
            key = this.props.asUnit.movementType.toLowerCase();
        } else if (!toggle) {
            text = key.charAt(0).toUpperCase() + key.slice(1);;
            textY = textY - 34;
        }
        
        classes = classes + " " + key;
        classes = (toggle) ? classes : classes + " big";

        let fragment = (toggle) ?
            <React.Fragment key={key} >
                <polygon className={classes} onClick={() => this._toggleMovementOptions()} points={points} />
                <text className={classes} onClick={() => this._toggleMovementOptions()} x={textX} y={textY} textAnchor="middle" width="150" fontFamily="sans-serif" fontSize={textSize}>{text}</text>
            </React.Fragment>
        :
            <React.Fragment key={key} >
                <polygon className={classes} onClick={() => this._setMovement(key)} points={points} />
                <text className={classes} onClick={() => this._setMovement(key)} x={textX} y={textY} textAnchor="middle" width="150" fontFamily="sans-serif" fontSize={54}>{text}</text>
            </React.Fragment>
        ;

        if (this.props.asUnit?.immobile) {
            fragment = 
                <React.Fragment key={key} >
                    <polygon className="move-token" points={points} />
                    <text className="move-token" x={textX} y={textY} textAnchor="middle" width="150" fontFamily="sans-serif" fontSize={textSize}>I</text>
                </React.Fragment>
        }


        return fragment;
    }

    private _movementOptions = (

    ): JSX.Element[] => {
        let options: JSX.Element[] = []

        let moveOptions = this.props.inPlay && this.props.asUnit ? this.props.asUnit.move : [];
        if (this.props.asUnit?.isAerospace === false) {

            options.push(
                this._movementCounter(145,120,280,'standstill',false)
            )
            if (moveOptions[0].currentMove > 0) {
                options.push(
                    this._movementCounter(455,120,280,'ground',false)
                )
                options.push(
                    this._movementCounter(775,120,280,'sprint',false)
                )
            }

            for( let currentMove = 0; moveOptions.length > currentMove; currentMove++ ) {

                // Add a jump option where applicable
                if (moveOptions[currentMove].type === 'j') {
                    options.push(
                        this._movementCounter(455,410,280,'jump',false)
                    )
                }  
            }
        } else {
            // Add the available heights for flight.
            options.push(
                this._movementCounter(145,120,280,'low',false)
            )
            options.push(
                this._movementCounter(455,120,280,'middle',false)
            )
            options.push(
                this._movementCounter(765,120,280,'high',false)
            )
            options.push(
                this._movementCounter(295,410,280,'extreme',false)
            )
            options.push(
                this._movementCounter(615,410,280,'grounded',false)
            )
        }

        return options;
    }

    private _setMovement = (type: string): void => {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.movementType = type;
            this.props.asUnit.calcCurrentValues();
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
        this.setState({
            showMovementOptions: false,
        })
    }

    private _GetBehavior = (

    ): JSX.Element => {
        let behavior = this.props.asUnit ? this.props.asUnit.getOpForBehavior() : null;

        let fragment = 
            <React.Fragment>
                <g transform='translate(90, -28)'>
                    <text className="cursor-pointer behavior" onClick={(e) => this._showOpForBehavior(e, behavior)} x="0" y="0" textAnchor="left" width="150" fontFamily="sans-serif" fontSize={20} fill='rgb(200,0,0)'>{behavior ? behavior.name : ""}</text>
                    {behavior?.reroll ? (<FaDiceD6 className="cursor-pointer behavior" onClick={(e) => this._rerollBehavior(e)} x={-30} y={-19} fontSize={24} fill='rgb(100,100,100)' />) : null }
                </g>
            </React.Fragment>
        ;

        return fragment;
    }

    private _showOpForBehavior = (
        e: React.MouseEvent<SVGTextElement, MouseEvent>,
        behavior: OpForBehavior | null,
    ) => {
        if( e && e.preventDefault ) e.preventDefault();
        if( this.props.showOpForBehavior && behavior ) {
            this.props.showOpForBehavior( behavior );
        }
    }

    private _rerollBehavior = (
        e: React.MouseEvent<SVGElement, MouseEvent>
    ) => {
        if( e && e.preventDefault ) e.preventDefault();
        if (this.props.asUnit) {
            this.props.asUnit.getOpForBehavior(true);
            this.setState(this.state);
        }
    }

    render = (): JSX.Element => {
        if( !this.props.asUnit ) {
            return <></>
        }

        let showHeat = this.props.asUnit.type.toLocaleLowerCase() === "bm" || this.props.asUnit.type.toLocaleLowerCase() === "af";
        let critLineStart = showHeat ? 63 : 72;
        let critLineHeight = showHeat ? 33 : 36;

        let damageLabelColWidth = 110;
        let damageColWidth=170;
        if ((this.props.showExtreme && this.props.asUnit.damage.extreme > 0) || this.props.asUnit.isAerospace){
            damageColWidth = 120;
            damageLabelColWidth = 100;
        }

        let shortDamageX = damageLabelColWidth;
        let mediumDamageX = damageLabelColWidth + damageColWidth;
        let longDamageX = damageLabelColWidth + damageColWidth*2;
        let extremeDamageX = damageLabelColWidth + damageColWidth*3;

        let pilotAbilitiesList = this.props.asUnit.getPilotAbilityList();
        let pilotAbilities = this.props.asUnit.getPilotAbilities();

        return (

            <>
                <svg className={"alpha-strike-card unit-type-" + this.props.asUnit.type.toLowerCase() + (this.props.className ? " " + this.props.className : "") + (this.props.inPlay ? " in-play" : "")} version="1.1" x="0px" y="0px" viewBox="0 0 1050 750" xmlns="http://www.w3.org/2000/svg">
                
                <defs>
                    <clipPath id="heat-shape">
                        <rect x="0" y="0" rx="15" ry="15" width="209" height="45" />
                    </clipPath>
                </defs>

                <rect x="0" y="0" width="100%" height="100%" fill="rgb(35,31,32)"></rect>
                <rect x="20" y="20" style={{zIndex: -1}} width="1010" height="710" className={this.props.asUnit.isWrecked() ? 'active' : 'unit-background'}></rect>                    

                {this.props.asUnit.imageURL ? (
                    <image x="770" y="100" href={this.props.asUnit.imageURL} className="unit-portrait"></image>
                ) : (
                    <></>
                )}

                {/* Unit Name */}
                <g className='card-name' transform='translate(36, 50)'>
                    <text x="0" y="2" className="variant">{this.props.asUnit.customName ? this.props.asUnit.customName : this.props.asUnit.variant}</text>
                    <text x="0" y="60" className="impact">{this.props.asUnit.class ? this.props.asUnit.class : this.props.asUnit.name.replace(this.props.asUnit.variant, " ").trim()}</text>

                    {pilotAbilitiesList.length > 0 ? (
                    <>
                        <text
                            x="0"
                            y={showHeat ? 92 : 99 }
                            fill="rgb(0,130,0)"
                            className='pilot-abilities'>
                            {pilotAbilitiesList.length > 1 ? (
                                <>Pilot Abilities: </>
                            ) : (
                                <>Pilot Ability: </>
                            )}
                        {pilotAbilities.map( (ability, abilityIndex) => {
                            if (ability) {
                                let comma = abilityIndex < pilotAbilitiesList.length - 1 ? ", " : "";
                                return <tspan key={abilityIndex} className={this.props.forPrint ? '' : 'cursor-pointer'} onClick={(e) => this._showPilotAbility(e, this.props.asUnit ? ability : null)}>{ability.ability}{comma}</tspan>;
                            } else {
                                return null;
                            }
                        })}
                        </text>
                        
                        <text x="0" y={showHeat ? 122 : 136} textAnchor="start" className='spa small data-pair'><tspan>SPA Total: </tspan>{this.props.asUnit.getTotalPilotAbilityPoints()}</text>
                    </>
                    ) : null}
                </g>

                {/* Point Value Box */}
                <g transform="translate(1030, 20)" className='point-value'>
                    <path d="M -100 0 L -136 68 H -42 L -6 0" fill="rgb(188,189,192"/>
                    <path d="M -226 -1 L -180 80 H 0" fill='transparent' stroke='rgb(0,0,0)' strokeWidth={3}/>
                    <path d="M -213 -1 L -174 68 H 0" fill='transparent' stroke='rgb(0,0,0)' strokeWidth={3}/>
                    <text x="-90" y="48" textAnchor="middle" className='current'><tspan>PV: </tspan>{this.props.asUnit.currentPoints}</text>
                    {this.props.asUnit.currentPoints !== this.props.asUnit.basePoints ? (
                        <text x="-10" y="106" textAnchor="end" className='base small data-pair'><tspan>Base PV: </tspan>{this.props.asUnit.basePoints.toString().toUpperCase()}</text>
                    ) : null}
                    
                </g>

                {/* Movement Box  */}
                <g transform={showHeat ? "translate(36, 186)" : "translate(36, 210)"}>
                    <rect x="0" y="0" width="538" height="90" fill="rgb(209,210,212)" stroke="rgb(0,0,0)" strokeWidth={3} rx="15" ry="15"></rect>
                    <g transform="translate(10, 31)">
                        <text x="0" y="0" className='data-pair'><tspan>TP: </tspan>{this.props.asUnit.type}</text>
                        <text x="116" y="0" className='data-pair'><tspan>SZ: </tspan>{this.props.asUnit.size}</text>
                        <text x="198" y="0" className='data-pair'><tspan>TMM: </tspan>{this.props.asUnit.currentTMM}</text>
                        <text x="518" y="0" className='data-pair' textAnchor='end'><tspan>{this.props.asUnit.isGroundUnit() ? "MV: " : "THR: "}</tspan>{this.props.measurementsInHexes ? this.props.asUnit.currentMoveHexes.trim() : this.props.asUnit.currentMove.trim()}</text>
                        {this.props.asUnit.isGroundUnit() && !this.props.forPrint ? (
                            <>
                                <text x="518" y="20" className='data-pair small' textAnchor='end'><tspan>Sprint: </tspan>{this.props.measurementsInHexes ? this.props.asUnit.currentMoveHexesSprint.trim() : this.props.asUnit.currentMoveSprint.trim()}</text>
                            </>
                        ) : null}
                    </g>

                    <g transform="translate(10, 80)">
                        <text x="0" y="0" className='data-pair'><tspan>ROLE: </tspan>{this.props.asUnit.role.toUpperCase()}</text>
                        {this.props.inPlay && this.props.aiMode ? this._GetBehavior() : null}
                        <text x="518" y="0" className='data-pair' textAnchor='end'><tspan>SKILL: </tspan>{this.props.asUnit.currentSkill}</text>
                        {/* Altitude */}
                        {this.props.inPlay && this.props.asUnit.altitude > -1 ? (
                            <g transform='translate(380, -90)'>
                                <text x="0" y="0" className='data-pair' textAnchor='start'><tspan>Alt: </tspan>{this.props.asUnit.altitude}</text>
                                <g className='cursor-pointer' onClick={() => this._changeAltitude(1)} transform='translate(110, -26)'>
                                    <rect x="0" y="0" rx="5" ry="5" width="30" height="30" fill='rgb(102,102,102'></rect>
                                    <FaArrowUp x="7" y="5" />
                                </g>
                                <g className='cursor-pointer' onClick={() => this._changeAltitude(-1)} transform='translate(-35, -26)'>
                                    <rect x="0" y="0" rx="5" ry="5" width="30" height="30" fill='rgb(102,102,102'></rect>
                                    <FaArrowDown x="7" y="5" />
                                </g>
                            </g>
                            ) : null}
                        {/* Movement Token */}
                        {this.props.inPlay ? this._movementCounter() : null}
                    </g>
                </g>

                {/* Damage Box */}
                <g transform={showHeat ? "translate(36, 286)" : "translate(36, 324)"}>
                    <rect x="0" y="0" width="540" height="90" fill="rgb(209,210,212)" stroke='rgb(0,0,0)' strokeWidth={3} rx="20" ry="20"></rect>
                    <text x="-45" y="25" className='vertical-text' textAnchor="middle" >DAMAGE</text>

                    <g transform={'translate(' + shortDamageX +',24)'} className="damage-column">
                        <text x="0" y="0">S (0{this.props.forPrint ? "" : " | " + this.props.asUnit.currentToHitShort + "+"})</text>
                        <text x="0" y="35" className='damage'>{this.props.asUnit.currentDamage.short}{this.props.asUnit.currentDamage.shortMinimal ? "*" : ""}</text>
                        <text x="0" y="56">{this.props.measurementsInHexes ? "0-3⬣" : '0-6'}</text>
                    </g>

                    <g transform={'translate(' + mediumDamageX +',24)'} className="damage-column">
                        <text x="0" y="0">M (2{this.props.forPrint ? "" : " | " + this.props.asUnit.currentToHitMedium + "+"})</text>
                        <text x="0" y="35" className='damage'>{this.props.asUnit.currentDamage.medium}{this.props.asUnit.currentDamage.mediumMinimal ? "*" : ""}</text>
                        <text x="0" y="56">{this.props.measurementsInHexes ? "4-12⬣" : '6-24'}</text>
                    </g>

                    <g transform={'translate(' + longDamageX +',24)'} className="damage-column">
                        <text x="0" y="0">L (4{this.props.forPrint ? "" : " | " + this.props.asUnit.currentToHitLong + "+"})</text>
                        <text x="0" y="35" className='damage'>{this.props.asUnit.currentDamage.long}{this.props.asUnit.currentDamage.longMinimal ? "*" : ""}</text>
                        <text x="0" y="56">{this.props.measurementsInHexes ? "13-21⬣" : '24-42'}</text>
                    </g>

                    {this.props.showExtreme || this.props.asUnit.isAerospace ? (
                    <g transform={'translate(' + extremeDamageX +',24)'} className="damage-column">
                        <text x="0" y="0">E (4{this.props.forPrint ? "" : " | " + this.props.asUnit.currentToHitExtreme + "+"})</text>
                        <text x="0" y="35" className='damage'>{this.props.asUnit.currentDamage.extreme}{this.props.asUnit.currentDamage.extremeMinimal ? "*" : ""}</text>
                        <text x="0" y="56" className='range'>{this.props.measurementsInHexes ? ">22⬣" : '>42'}</text>
                    </g>
                    ) : null}

                </g>

                {/* Heat Scale Box */}
                {showHeat ? (
                <g transform="translate(36, 386)">
                    <rect x="0" y="0" width="538" height="60" fill="rgb(209,210,212)" stroke='rgb(0,0,0)' strokeWidth={3} rx="20" ry="20"></rect>
                    <text x="10" y="41" className='data-pair'><tspan>OV: </tspan>{this.props.asUnit.overheat}</text>
                    <rect x="99" y="14" width="2" height="34" fill="rgb(0,0,0)"></rect>
                    <text x="112" y="41" className='data-pair'>HEAT SCALE</text>

                    <g transform="translate(310, 5)">
                        <rect x="0" y="0" width="215" height="50" fill="rgb(0,0,0)" rx="17" ry="17"></rect>

                    <g transform="translate(3,3)" clipPath='url(#heat-shape)'>
                        {/* 1 Heat */}
                        <rect
                            onClick={() => this._setHeat(1)}
                            className={"heat heat-1" + (this.props.asUnit.currentHeat === 1 ? " active" : "") + (this.props.asUnit.roundHeat === 1 ? " staged" : "")} 
                            x="0"
                            y="0"
                            width="50"
                            height="44"
                        ></rect>
                        <text onClick={() => this._setHeat(1)} className={this.props.inPlay && this.props.asUnit ? "heat-text cursor-pointer" : "heat-text"} x="25" y="34" textAnchor="middle">1</text>

                        {/* 2 Heat */}
                        <rect
                            onClick={() => this._setHeat(2)}
                            className={"heat heat-2" + (this.props.asUnit.currentHeat === 2 ? " active" : "") + (this.props.asUnit.roundHeat === 2 ? " staged" : "")} 
                            x="53"
                            y="0"
                            width="50"
                            height="44"
                        ></rect>
                        <text onClick={() => this._setHeat(2)} className={this.props.inPlay && this.props.asUnit ? "heat-text cursor-pointer" : "heat-text"} x="78" y="34" textAnchor="middle">2</text>

                        {/* 3 Heat */}
                        <rect
                            onClick={() => this._setHeat(3)}
                            className={"heat heat-3" + (this.props.asUnit.currentHeat === 3 ? " active" : "") + (this.props.asUnit.roundHeat === 3 ? " staged" : "")} 
                            x="106"
                            y="0"
                            width="50"
                            height="44"
                        ></rect>
                        <text onClick={() => this._setHeat(3)} className={this.props.inPlay && this.props.asUnit ? "heat-text cursor-pointer" : "heat-text"} x="131" y="34" textAnchor="middle">3</text>

                        {/* Shutdown Heat */}
                        <rect
                            onClick={() => this._setHeat(4)}
                            className={"heat heat-4" + (this.props.asUnit.currentHeat === 4 ? " active" : "") + (this.props.asUnit.roundHeat === 4 ? " staged" : "")} 
                            x="159"
                            y="0"
                            width="50"
                            height="44"
                        ></rect>
                        <text onClick={() => this._setHeat(4)} className={this.props.inPlay && this.props.asUnit ? "heat-text cursor-pointer" : "heat-text"} x="184" y="34" textAnchor="middle">S</text>
                    </g>
                    </g>
                </g>
                ) : null}
                {/* End Heat Scale Box */}
                

                {/* Armor and Structure Box */}
                <g transform={showHeat ? "translate(36, 456)" : "translate(36, 440)"}>
                    <rect x="0" y="0" width="538" height="90" fill="rgb(209,210,212)" stroke='rgb(0,0,0)' strokeWidth={3} rx="20" ry="20"></rect>

                    {this.props.inPlay ? (
                        <>
                        <rect onClick={this._toggleTakeDamage} className="cursor-pointer" x="5" y="5" width="45" height="80" fill="rgb(255,0, 0)" rx="15" ry="15" />
                        <text x="-45" y="21" onClick={this._toggleTakeDamage} className='vertical-text cursor-pointer' fill="rgba(255,255,255)" textAnchor="middle" >TAKE</text>
                        <text x="-45" y="38" onClick={this._toggleTakeDamage} className='vertical-text cursor-pointer' fill="rgba(255,255,255)" textAnchor="middle" >DAMAGE</text>
                        </>
                    ): (
                        <></>
                    )}

                    {this.state.showTakeDamage ? (
                        <g transform='translate(62, 25)'>
                            <text x="231.5" y="-7" textAnchor="middle" fontFamily="sans-serif" fontSize="18">Click below to add damage taken</text>
                            <rect x="0" y="0" width="463" height="60" fill="rgb(0,0,0)" rx="15" ry="15"></rect>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(1)} x="2" y="2" rx="15" ry="15" width="30" height="56" fill="rgb(102,102,102)"></rect>
                            <rect className="cursor-pointer" onClick={() => this._takeDamage(1)} x="20" y="2" width="30" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(1)} x="27" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>1</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(2)} x="52" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(2)} x="77" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>2</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(3)} x="104" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(3)} x="129" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>3</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(4)} x="156" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(4)} x="181" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>4</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(5)} x="208" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(5)} x="233" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>5</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(6)} x="260" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(6)} x="285" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>6</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(7)} x="312" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(7)} x="337" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>7</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(8)} x="364" y="2" width="50" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(8)} x="389" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>8</text>

                            <rect className="cursor-pointer" onClick={() => this._takeDamage(9)} x="431" y="2" rx="15" ry="15" width="30" height="56" fill="rgb(102,102,102)"></rect>
                            <rect className="cursor-pointer" onClick={() => this._takeDamage(9)} x="416" y="2" width="30" height="56" fill="rgb(102,102,102)"></rect>
                            <text className="cursor-pointer" onClick={() => this._takeDamage(9)} x="438" y="42" textAnchor="middle" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>9</text>
                        </g>
                    ) : (

                        <>
                        {/* Armor */}
                        <g transform={this.props.inPlay ? 'translate(56,38)' : 'translate(10,38)'}>
                            <text x="0" y="0" className='data-pair'><tspan>A:</tspan></text>
                            {this._makeArmorDots( "armor" )}
                        </g>
                        {/* End Armor */}

                        {/* Structure */}
                        <g transform={this.props.asUnit.armor >  (this.props.asUnit && this.props.asUnit.threshold!==0 ? 14 : 16) ? (
                                this.props.inPlay ? 'translate(56,82)' : 'translate(10,82)'
                            ) : (
                                this.props.inPlay ? 'translate(56,76)' : 'translate(10,76)'
                            )}>
                            <text x="0" y="0" className='data-pair'><tspan>S:</tspan></text>
                            {this._makeArmorDots(  "structure" )}
                        </g>
                        {/* End Structure */}

                        {/* Threshold Display */}
                        {this.props.asUnit.threshold!==0 ? (
                            <g transform='translate(508, 36)' className='data-pair'>
                                <text x="0" y="0" textAnchor="middle"><tspan>TH</tspan></text>
                                <text x="0" y="40" textAnchor="middle" className='threshold'>{this.props.asUnit.threshold}</text>
                            </g>
                        ) : null
                        }
                        {/* End Threshold Display */}
                        </>
                    )}

                </g>
                {/* End Armor and Structure Box */}

                {/* Specials Box */}
                <g transform='translate(36, 556)'>
                <rect x="0" y="0" width="538" height="80" fill="rgb(209,210,212)" stroke='rgb(0,0,0)' strokeWidth={3} rx="20" ry="20"></rect>
                <foreignObject x="14" y="3" width="512" height="70">
                    <p className='specials'>SPECIAL:&nbsp;
                    {this.props.asUnit.abilities.map( (word, wordIndex) => {
                        let comma = this.props.asUnit && wordIndex < this.props.asUnit.abilities.length - 1 ? ", " : "";

                        if( this.props.asUnit && this.props.inPlay ) {
                            let ability = this.props.asUnit.getSpecialAbility(word);
                            if( ability !== null ) {
                                return (
                                    //@ts-ignore
                                    <React.Fragment key={wordIndex}><a onClick={(e) => this.props.showSpecialAbility(e, ability)} title={"Click here to view the description for " + word} href="/">{word}</a>{comma}</React.Fragment>
                                )
                            } else {
                                return (
                                    <React.Fragment key={wordIndex}>{word}{comma}</React.Fragment>
                                )
                            }
                        } else {
                            return (
                                <React.Fragment key={wordIndex}>{word}{comma}</React.Fragment>
                            )
                        }
                    })}
                    </p>
                </foreignObject>
                </g>

                {/* Critical Hits */}
                {!this.props.asUnit.isInfantry ? (
                <g transform={showHeat ? "translate(584, 456)" : "translate(584, 440)"}>
                {/* Outline Box and Title */}
                <rect x="0" y="0" width="430" height={showHeat ? 180 : 196} fill="rgb(209,210,212)" stroke='rgb(0,0,0)' strokeWidth={3} rx="20" ry="20"></rect>
                <text x="215" y={showHeat ? 33 : 39} textAnchor="middle" fontSize="35" className='strong'>CRITICAL HITS</text>
                {/* End Outline Box and Title */}

                {this.props.asUnit.type.toLowerCase() !== "pm" ? (
                    <g transform={'translate(148, ' + critLineStart + ')'}>
                        <text x="0" y="0" textAnchor="end" className='crit-label'>ENGINE</text>

                        {this.props.asUnit.engineHits.map( (ehValue, ehIndex) => {
                            let classes = ["dot"];
                            if (this.props.asUnit?.roundEngineHits[ehIndex]) {
                                classes.push("staged");
                            }
                            if (ehValue) {
                                classes.push("active");
                            }
                            return (
                                <React.Fragment key={ehIndex}>
                                    <circle
                                        cx={16 + (this.buttonRadius * 2.5) * ehIndex}
                                        cy={this.buttonRadius - 18}
                                        r={this.buttonRadius}
                                        className={classes.join(" ")}
                                        onClick={() => this._toggleEngineHit(ehIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                        })}

                        <text x={3 + (this.buttonRadius * 2.5)*this.props.asUnit.engineHits.length} y="0" textAnchor="start" className='crit-description'>{this.props.asUnit.type.toLowerCase() === 'cv' ||  this.props.asUnit.type.toLowerCase() === 'sv' ? "½ MV and Damage" : "+1 Heat/Firing Weapons"}</text>
                        {critLineStart += critLineHeight}
                    </g>
                ) : (
                    <></>
                )}

                <g transform={'translate(148, ' + critLineStart + ')'}>
                    <text x="0" y="0" textAnchor="end" className='crit-label'>FIRE CONTROL</text>
                    {this.props.asUnit.fireControlHits.map( (fcValue, fcIndex) => {
                                let classes = ["dot"];
                                if (this.props.asUnit?.roundFireControlHits[fcIndex]) {
                                    classes.push("staged");
                                }
                                if (fcValue) {
                                    classes.push("active");
                                }
                                return (
                                    <React.Fragment key={fcIndex}>
                                        <circle
                                            cx={16 + (this.buttonRadius * 2.5) * fcIndex}
                                            cy={this.buttonRadius - 18}
                                            r={this.buttonRadius}
                                            className={classes.join(" ")}
                                            onClick={() => this._toggleFireControlHit(fcIndex)}
                                        ></circle>
                                    </React.Fragment>
                                )
                    })}
                    <text x={3 + (this.buttonRadius * 2.5)*this.props.asUnit.fireControlHits.length} y="0" textAnchor="start" className='crit-description'>+2 To Hit Each</text>
                    {critLineStart += critLineHeight}
                </g>

                {this.props.asUnit.type.toLowerCase() === 'bm' || this.props.asUnit.type.toLowerCase() === 'pm' ? (
                    <g transform={'translate(148, ' + critLineStart + ')'}>
                        <text x="0" y="0" textAnchor="end" className='crit-label'>MP</text>
                        {this.props.asUnit.mpControlHits.map( (mpValue, mpIndex) => {
                            let classes = ["dot"];
                            if (this.props.asUnit?.roundMpControlHits[mpIndex]) {
                                classes.push("staged");
                            }
                            if (mpValue) {
                                classes.push("active");
                            }
                            return (
                                <React.Fragment key={mpIndex}>
                                    <circle
                                        cx={16 + (this.buttonRadius * 2.5) * mpIndex}
                                        cy={this.buttonRadius - 18}
                                        r={this.buttonRadius}
                                        className={classes.join(" ")}
                                        onClick={() => this._toggleMPHit(mpIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                        })}
                        <text x={5 + (this.buttonRadius * 2.5)*this.props.asUnit.mpControlHits.length} y="0" textAnchor="start" className='crit-description'>½ Move Each</text>
                        {critLineStart += critLineHeight}
                    </g>
                ) :
                (
                    <></>
                )}

                <g transform={'translate(148, ' + critLineStart + ')'}>
                    <text x="0" y="0" textAnchor="end" className='crit-label'>WEAPONS</text>
                    {this.props.asUnit.weaponHits.map( (whValue, whIndex) => {
                                let classes = ["dot"];
                                if (this.props.asUnit?.roundWeaponHits[whIndex]) {
                                    classes.push("staged");
                                }
                                if (whValue) {
                                    classes.push("active");
                                }
                                return (
                                    <React.Fragment key={whIndex}>
                                        <circle
                                            cx={16 + (this.buttonRadius * 2.5) * whIndex}
                                            cy={this.buttonRadius - 18}
                                            r={this.buttonRadius}
                                            className={classes.join(" ")}
                                            onClick={() => this._toggleWeaponHit(whIndex)}
                                        ></circle>
                                    </React.Fragment>
                                )
                    })}
                    <text x={3 + (this.buttonRadius * 2.5)*this.props.asUnit.weaponHits.length} y="0" textAnchor="start" textRendering={"optimizeLegibility"} className='crit-description'>-1 Damage Each</text>
                    {critLineStart += critLineHeight}
                </g>

                {this.props.asUnit.type.toLowerCase() === 'cv' ||  this.props.asUnit.type.toLowerCase() === 'sv'? (  
                    <g transform={"translate(6, " + (critLineStart - 2) + ")"}>
                        <text x="16" y="0" textAnchor="start" className='crit-label'>MOTIVE</text>

                        <g transform='translate(108, 0)'>
                            <circle 
                                onClick={() => this._toggleVehicle910(0)} 
                                className={"dot" + (this.props.asUnit.vehicleMotive910[0] ? " active" : "") + (this.props.asUnit.roundVehicleMotive910[0] ? " staged" : "")} 
                                cx="0" 
                                cy={this.buttonRadius - 18} 
                                r={this.buttonRadius} 
                            ></circle>
                            <circle 
                                onClick={() => this._toggleVehicle910(1)} 
                                className={"dot" + (this.props.asUnit.vehicleMotive910[1] ? " active" : "") + (this.props.asUnit.roundVehicleMotive910[1] ? " staged" : "")} 
                                cx={this.buttonRadius * 2.5} 
                                cy={this.buttonRadius - 18} 
                                r={this.buttonRadius} 
                            ></circle>
                            <text x={(this.buttonRadius * 2)*2} y="0" textAnchor="start" className='crit-description'>-2 MV</text>
                        </g>

                        <g transform='translate(225, 0)'>
                            <circle 
                                onClick={() => this._toggleVehicle11(0)} 
                                className={"dot" + (this.props.asUnit.vehicleMotive11[0] ? " active" : "") + (this.props.asUnit.roundVehicleMotive11[0] ? " staged" : "")} 
                                cx="0" 
                                cy={this.buttonRadius - 18} 
                                r={this.buttonRadius} 
                            ></circle>
                            <circle 
                                onClick={() => this._toggleVehicle11(1)} 
                                className={"dot" + (this.props.asUnit.vehicleMotive11[1] ? " active" : "") + (this.props.asUnit.roundVehicleMotive11[1] ? " staged" : "")} 
                                cx={this.buttonRadius * 2.5} 
                                cy={this.buttonRadius - 18} 
                                r={this.buttonRadius} 
                            ></circle>
                            <text x={(this.buttonRadius * 2)*2} y="0" textAnchor="start" className='crit-description'>½ MV</text>
                        </g>
                        
                        <g transform='translate(342, 0)'>
                            <circle 
                                onClick={() => this._toggleVehicle12()} 
                                className={"dot" + (this.props.asUnit.vehicleMotive12 ? " active" : "") + (this.props.asUnit.roundVehicleMotive12 ? " staged" : "")} 
                                cx="0" 
                                cy={this.buttonRadius - 18} 
                                r={this.buttonRadius}  
                            ></circle>
                            <text x={(this.buttonRadius * 1.625)} y="0" textAnchor="start" className='crit-description'>0 MV</text>
                        </g>
                        {critLineStart += critLineHeight}
                    </g>
                ) : (
                    <></>
                )}

                    </g>
                ) : (
                    <>
                        {/* Infantry has no crits */}
                    </>
                )}

                {/* End Critical Hits */}

                {this.state.showMovementOptions ? (
                    <>
                        {this._movementOptions()};
                    </>
                )  : null}

                {this.props.asUnit.isWrecked() ? (
                    <text x="0" y="100" fontFamily="sans-serif" transform="rotate( 30, -100, 260)" fontSize="200" stroke="rgb(0,0,0)" strokeWidth="4" fill="rgb(200,0,0)" pointerEvents="none">WRECKED</text>
                ) : (
                    <></>
                )}

                <g transform='translate(20, 650)'>
                    <path d="M 0 50 L 19 80 H 0" fill="rgb(188,189,192"/>
                    <path d="M 96 15 H 188 L 226 80 H 134" fill="rgb(188,189,192"/>
                    <path d="M 300 15 H 392 L 430 80 H 338" fill="rgb(188,189,192"/>
                    <path d="M 0 15 H 475 L 513 80" fill='transparent' stroke='rgb(0,0,0)' strokeWidth={3}/>
                    <path d="M 0 0 H 486 L 532 80" fill='transparent' stroke='rgb(0,0,0)' strokeWidth={3}/>
                    <text x="21" y="64" textAnchor="start" className='card-title'>ALPHA STRIKE STATS</text>
                </g>

                {this.props.inPlay && this.props.asUnit.hasRoundStaged() ? ( 
                    <g className='staged' transform='translate(664, 20)'>
                        <polygon points="0,0 140,0 161,40 21,40" onClick={(e) => this._ApplyRound()}></polygon>
                        <path onClick={(e) => this._ApplyRound()} d="M 0 0 L 21 40 H 162"/>
                        <text x="80" y="30" 
                            onClick={(e) => this._ApplyRound()}
                            className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                            fontFamily="sans-serif" 
                            fontSize="30"
                            fontWeight="bold"
                            fill="rgb(255,255,255)"
                            textAnchor='middle'
                            >APPLY</text>
                    </g>
                ) : null }

                <BattleTechLogo
                    xLoc={586}
                    yLoc={660}
                    width={414}
                    baseColor='rgb(35,31,32)'
                    altColor='rgb(105,106,108)'
                />

                </svg>
            </>
        )
    }
}

interface IAlphaStrikeUnitSVGProps {
    height?: string;
    width?: string;
    asUnit: AlphaStrikeUnit | null;
    inPlay?: boolean;
    appGlobals: IAppGlobals;
    className?: string;
    forPrint?: boolean;
    showExtreme?: boolean;
    measurementsInHexes: boolean;
    showPilotAbility?( ability: IASPilotAbility ): void;
    showSpecialAbility?(
        e: React.FormEvent<HTMLAnchorElement>,
        ability: IASSpecialAbility
      ): void;
    showOpForBehavior?( behavior: OpForBehavior): void;
    aiMode?: boolean;
}

interface IAlphaStrikeUnitSVGState {
    showTakeDamage: boolean;
    showMovementOptions: boolean;
}