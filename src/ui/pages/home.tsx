import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../app-router';
import TextSection from '../components/text-section';
import UIPage from '../components/ui-page';
import './home.scss';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Home");
    }

    render = (): React.ReactFragment => {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>

          {/* <div className="alert alert-success">
            <p>Yes! We're back. Sorry about that. I was hoping that the official BattleTech app would cover most of the functionality of this app, but, alas, it didn't. So we're back!</p>
            <p>I'll try to keep the <Link to="dev-status">Development Status</Link> page up to date, but it's easy to forget with all my other projects</p>
            <div className="text-right"><span title="Commanding Officer, Commanding Officer 😉😘">XOXO</span> - Jeff</div>
          </div> */}
          <TextSection
            label="News"
          >
                  <ul className="news">
                    <li>
                      <p><strong>2022 Mar 13</strong> - The <Link to="settings">Settings</Link> page now includes some total backup/restore functionality. Some care has been made to be sure that if you have any new items on the restore-to device, that the data won't be overwritten. Work still progresses on that safety. You should now have all you need to sync (manually) across devices until I find some syncing solution which is compatible with GitHub pages.</p>

                    </li>
                    <li>
                      <p><strong>2022 Mar 11</strong> - I've started reworking the <Link to="alpha-strike-roster">Alpha Strike Roster</Link> interface. Adding units to the current force is now on a button. Later I might change the main screen so that all the Current Units show up on top and favorite units will be at the bottom. Right now this cleans uop the page significantly, but I'm still not happy with it.</p>

                    </li>
                    <li>
                      <p><strong>2022 Feb 23</strong> - Added a Print function to your Alpha Strike Rosters (finally!?!?!).</p>
                      <p>I might be working on Google Account data syncing this afternoon, although Google still gives me the heebie-jeebies. First, however, I want to finish the internal <Link to="equipment-editor">Equipment Editor</Link> so I can get the rest of the Clan and Inner Sphere weapons ready for the BattleMech creator.</p>

                    </li>
                    <li>
                      <p><strong>2022 Feb 18</strong> - Since there's still a pretty big gap in Alpha Strike Force creation and BattleMech creation on mobile devices, I've decided to reopen this app again. The official App is great, albeit slow, and doesn't do much for Alpha Strike folks.</p>

                    </li>
                  </ul>
              </TextSection>

        </UIPage>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}