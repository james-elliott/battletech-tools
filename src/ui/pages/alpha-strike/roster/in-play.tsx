import React from 'react';
import { FaArrowCircleLeft, FaRuler } from "react-icons/fa";
import { FiHexagon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AlphaStrikeGroup from '../../../../classes/alpha-strike-group';
import { CONST_BATTLETECH_URL } from '../../../../configVars';
import { IASPilotAbility } from '../../../../data/alpha-strike-pilot-abilities';
import { getSpecialAbilityTypeName, IASSpecialAbility } from '../../../../data/alpha-strike-special-abilities';
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import StandardModal from '../../../components/standard-modal';
import AlphaStrikeUnitCard from '../../../components/alpha-strike-play-card';
import './in-play.scss';
import { IFormationBonus } from '../../../../data/formation-bonuses';

export default class AlphaStrikeRosterInPlay extends React.Component<IInPlayProps, IInPlayState> {

    constructor(props: IInPlayProps) {
        super(props);

        this.state = {
            updated: false,
            showPilotAbility: null,
            showSpecialAbility: null,
            settingsOpen: false,
            showFormationBonus: null
        };

        this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }

    toggleCardMode = (
      e: React.FormEvent<HTMLSpanElement>
    ): void => {

      if( e && e.preventDefault ) e.preventDefault();

      let appSettings = this.props.appGlobals.appSettings;

      this.props.appGlobals.saveAppSettings( appSettings );

    }

    resetGroup = (
      e: React.FormEvent<HTMLButtonElement>,
      group: AlphaStrikeGroup,
    ): void => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to reset all the units to full status?",
        "Yes",
        "No, Thank you",
        () => {
          for( let unit of group.members ) {
            if( unit && unit.reset ) {
              unit.reset();
            }

          }

          this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
      )
    }

    toggleAlphaStrikeMeasurementsInHexes = (
        e: React.FormEvent<HTMLSpanElement>
      ): void => {

        if( e && e.preventDefault ) e.preventDefault();

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.alphaStrikeMeasurementsInHexes = !appSettings.alphaStrikeMeasurementsInHexes;
        this.props.appGlobals.saveAppSettings( appSettings );
    }

    showPilotAbility = ( ability: IASPilotAbility ): void => {
      this.setState({
        showPilotAbility: ability,
      })
    };

    showSpecialAbility = (
      e: React.FormEvent<HTMLAnchorElement>,
      ability: IASSpecialAbility
    ): void => {
      e.preventDefault();
      this.setState({
        showSpecialAbility: ability,
      })
    };

    showFormationBonus = ( bonus: IFormationBonus ): void => {
      this.setState({
        showFormationBonus: bonus,
      })
    };

    closeModal = (): void => {
      this.setState({
        showSpecialAbility: null,
        showFormationBonus: null,
        showPilotAbility: null,
      })
    }

    nextRound = (
      e: React.FormEvent<HTMLSpanElement>
    ): void => {
      if( e && e.preventDefault ) e.preventDefault();

      this.props.appGlobals.openConfirmDialog(
        "Next Round",
        "Ending the round will apply all the pending updates to all units heat and damage.",
        "Next Round",
        "Cancel",
        () => {
          if (this.props.appGlobals.currentASForce) {
            for (let group of this.props.appGlobals.currentASForce.groups) {
              for( let unit of group.members ) {
                unit.applyRound();

                // Leave units in hull down, otherwise reset their token
                if (unit.moveToken.type !== 'hull down') {
                  unit.moveToken = {
                    move: 0,
                    currentMove: 0,
                    currentSprint: 0,
                    type: '',
                    tmm: 0,
                  }
                }
                
                // Apply HarJel where applicable
                let harjel = unit.getAbilityValues('BHJ').damage - 1;
                if (harjel > 0 && unit.getCurrentArmor() > 0) {
                  for (let index = unit.currentArmor.length - 1; index > -1; index--) {
                    if (unit.currentArmor[index] && harjel > 0) {
                      unit.currentArmor[index] = false;
                      harjel--;
                    }
                  }
                }
              }
            }

            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );

          }  
        }
      )
    }

    render = (): JSX.Element => {
      if(!this.props.appGlobals.currentASForce) {
        return <></>;
      }
      return (
        <>
{this.state.showPilotAbility ? (
<StandardModal
  title={this.state.showPilotAbility.ability+ " (" + this.state.showPilotAbility.cost + ")"}
  show={true}
  onClose={this.closeModal}
>
  <div className='text-center'><em>Pilot Special Ability</em> - <span title="Alpha Strike Commander's Edition">p{this.state.showPilotAbility.asce_page}</span></div>
  {this.state.showPilotAbility.summary.map( (line, lineIndex) => {
    return (
      <p key={lineIndex}>{line}</p>
    )
  })}
</StandardModal>
) : null}

{this.state.showSpecialAbility ? (
<StandardModal
  title={this.state.showSpecialAbility.rawTag + ": " + this.state.showSpecialAbility.name}
  show={true}
  onClose={this.closeModal}
>
  <div className='text-center'><em>{getSpecialAbilityTypeName(this.state.showSpecialAbility.type)}</em> - <span title="Alpha Strike Commander's Edition">p{this.state.showSpecialAbility.asce_page}</span></div>

  {this.state.showSpecialAbility.summary.map( (line, lineIndex) => {
    return (
      <p key={lineIndex}>{line}</p>
    )
  })}
</StandardModal>
) : null}

{this.state.showFormationBonus ? (
<StandardModal
  title={this.state.showFormationBonus.Name}
  show={true}
  onClose={this.closeModal}
>
{this.state.showFormationBonus.BonusDescription}
</StandardModal>
) : null}

        <header className="play-bar flex-grid justified">
          <Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}><FaArrowCircleLeft /></Link>
          
          <button title="Apply damage and heat changes to end the round and start another" className="" onClick={this.nextRound}>Next Round</button>

          <button title="Toggle between measurements in inches or hexes" onClick={(e) => this.toggleAlphaStrikeMeasurementsInHexes(e)}>
            {this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes ? (
                <FiHexagon />
            ) : (
                <FaRuler />
            )}
          </button>

        </header>
          {this.props.appGlobals.currentASForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div className="in-play-group flex-grid">
                <div className='group-title row justified'>
                  <h2>
                  {group.getName(groupIndex + 1)}
                  </h2>
                  {group.formationBonus! && group.formationBonus!.Name !== "None" ?(
                      <div onClick={() => this.showFormationBonus(group.formationBonus!)}><strong>Formation Type</strong>:&nbsp;
                      {group.formationBonus!.Name}</div>
                  ) : null
                  }
                  

                  <div className='data-pair large'>
                    {group.isUnderStrength() ? (
                      <button
                        className="btn-primary"
                        title={"Click here to reset the damage for this " + group.groupLabel + ". You'll be prompted for confirmation."}
                        onClick={(e) => this.resetGroup( e, group )}
                      >
                        Reset Lance
                      </button>
                    ) : null}
                    <span>PV:</span>{group.getTotalPoints()}
                  </div>
                </div>

                
                <div className="section-content">
                  <div className={"flex-grid"}>
                  {group.members.map( (unit, unitIndex) => {
                    // if( unitIndex === 0 && group.members[unitIndex +1 ])

                    // let newInstance = new AlphaStrikeUnit( unit.export() );
                    return (
                    <React.Fragment key={unitIndex}>
                      <div className="unit-card">
                        <AlphaStrikeUnitCard
                          asUnit={unit}
                          appGlobals={this.props.appGlobals}
                          measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                          showSpecialAbility={this.showSpecialAbility}
                          showPilotAbility={this.showPilotAbility}
                        />
                      </div>
                    </React.Fragment>
                    )
                  })}

                  </div>
              </div>
              </div>
            </React.Fragment>
            )
          })}
          <footer className='flex-grid center'>
            <a
                href={CONST_BATTLETECH_URL}
                rel="noopener noreferrer"
                target="_blank"
                title="Click here to go to the official BattleTech website!"
            >
                <BattleTechLogo
                />
            </a>
          </footer>
        </>
      );
    }
}

interface IInPlayProps {
  appGlobals: IAppGlobals;

}

interface IInPlayState {
  updated: boolean;
  showPilotAbility: IASPilotAbility | null,
  showSpecialAbility: IASSpecialAbility | null,
  showFormationBonus: IFormationBonus | null;
  settingsOpen: boolean;
}