import { IASMULUnit } from "../../classes/alpha-strike-unit";
import { ESaveDataMode } from "../../dataSaves";

export class AppSettings {
    developerMenu: boolean = false;
    alphaStrikeMeasurementsInHexes: boolean = false;
    aiMode: boolean = false;
    uiTheme: string = "";
    equipmentFilter: string = "";
    installEquipCategory: string = "";

    mechRulesFilter: number = 0;
    mechNameFilter: string = "";

    storageLocation: ESaveDataMode = ESaveDataMode.localStorage;

    alphasStrikeCachedSearchResults: IASMULUnit[] = [];
    alphaStrikeSearchTerm: string = "";
    alphaStrikeInPlayColumns: number = 2;
    alphaStrikeSearchRules: string = "";
    alphaStrikeSearchTech: string = "";
    alphaStrikeSearchRole: string = "";
    alphaStrikeSearchEra: number = 0;
    alphaStrikeSearchType: number = 0;
    alphaStrikeFactionSearchTerm: string = "";
    alphaStrikeFactionSuggestions: Array<number> = [];
    alphaStrikeSearchFactions: Array<number> = [];
    hideMPIntro: boolean = false;

    equipmentEditorFile: string = "";
    asValues: Record<string, number> = {};

    constructor( io: IAppSettingsExport | null ) {
        this.import(io);
    }

    import( io: IAppSettingsExport | null ) {
        if( io ) {
            if ( typeof( io.uiTheme ) !== "undefined" ) {
                this.uiTheme = io.uiTheme;
            }

            if ( typeof( io.alphaStrikeMeasurementsInHexes ) !== "undefined" ) {
                this.alphaStrikeMeasurementsInHexes = io.alphaStrikeMeasurementsInHexes;
            }

            if ( typeof( io.aiMode ) !== "undefined" ) {
                this.aiMode = io.aiMode;
            }

            if ( typeof( io.developerMenu ) !== "undefined" ) {
                this.developerMenu = io.developerMenu;
            }
            if ( typeof( io.equipmentFilter ) !== "undefined" ) {
                this.equipmentFilter = io.equipmentFilter;
            }

            if ( typeof( io.installEquipCategory ) !== "undefined" ) {
                this.installEquipCategory = io.installEquipCategory;
            }

            if ( typeof( io.alphasStrikeCachedSearchResults ) !== "undefined" ) {
                this.alphasStrikeCachedSearchResults = io.alphasStrikeCachedSearchResults;
            }

            if ( typeof( io.alphaStrikeSearchRules ) !== "undefined" ) {
                this.alphaStrikeSearchRules = io.alphaStrikeSearchRules;
            }

            if ( typeof( io.alphaStrikeSearchTerm ) !== "undefined" ) {
                this.alphaStrikeSearchTerm = io.alphaStrikeSearchTerm;
            }

            if ( typeof( io.alphaStrikeInPlayColumns ) !== "undefined" ) {
                this.alphaStrikeInPlayColumns = io.alphaStrikeInPlayColumns;
            }

            if ( typeof( io.equipmentEditorFile ) !== "undefined" ) {
                this.equipmentEditorFile = io.equipmentEditorFile;
            }

            if ( typeof( io.alphaStrikeSearchEra ) !== "undefined" && !isNaN(io.alphaStrikeSearchEra) ) {
                this.alphaStrikeSearchEra = +io.alphaStrikeSearchEra;
            }

            if ( typeof( io.alphaStrikeSearchTech ) !== "undefined" ) {
                this.alphaStrikeSearchTech = io.alphaStrikeSearchTech;
            }
            if ( typeof( io.alphaStrikeSearchType ) !== "undefined" ) {
                this.alphaStrikeSearchType = io.alphaStrikeSearchType;
            }

            if ( typeof( io.alphaStrikeSearchRole ) !== "undefined" ) {
                this.alphaStrikeSearchRole = io.alphaStrikeSearchRole;
            }

            if ( typeof( io.alphaStrikeSearchFactions ) !== "undefined" ) {
                this.alphaStrikeSearchFactions = io.alphaStrikeSearchFactions;
            }

            if ( typeof( io.asValues ) !== "undefined" ) {
                this.asValues = io.asValues;
            }
            if ( typeof( io.mechNameFilter ) !== "undefined" ) {
                this.mechNameFilter = io.mechNameFilter;
            }
            if ( typeof( io.mechRulesFilter ) !== "undefined" ) {
                this.mechRulesFilter = io.mechRulesFilter;
            }
        }
    }

    export(): IAppSettingsExport {
        return {
            uiTheme: this.uiTheme,
            developerMenu: this.developerMenu,
            equipmentFilter: this.equipmentFilter,
            installEquipCategory: this.installEquipCategory,
            alphasStrikeCachedSearchResults: this.alphasStrikeCachedSearchResults,
            alphaStrikeSearchTerm: this.alphaStrikeSearchTerm,
            alphaStrikeInPlayColumns: this.alphaStrikeInPlayColumns,
            equipmentEditorFile: this.equipmentEditorFile,
            alphaStrikeSearchRules: this.alphaStrikeSearchRules,
            alphaStrikeSearchEra: this.alphaStrikeSearchEra,
            alphaStrikeSearchTech: this.alphaStrikeSearchTech,
            alphaStrikeSearchType: this.alphaStrikeSearchType,
            alphaStrikeSearchRole: this.alphaStrikeSearchRole,
            alphaStrikeMeasurementsInHexes: this.alphaStrikeMeasurementsInHexes,
            aiMode: this.aiMode,
            asValues: this.asValues,
            alphaStrikeSearchFactions: this.alphaStrikeSearchFactions,
            hideMPIntro: this.hideMPIntro,
        

            mechRulesFilter: this.mechRulesFilter,
            mechNameFilter: this.mechNameFilter,
        }
    }
}

export interface IAppSettingsExport {
    uiTheme: string;
    developerMenu: boolean;
    equipmentFilter: string;
    installEquipCategory: string;

    alphasStrikeCachedSearchResults: IASMULUnit[];
    alphaStrikeSearchTerm: string;
    alphaStrikeSearchRules: string;
    alphaStrikeSearchTech: string;
    alphaStrikeSearchRole: string;
    alphaStrikeSearchEra: number;
    alphaStrikeSearchType: number;
    alphaStrikeInPlayColumns: number;
    alphaStrikeMeasurementsInHexes: boolean;
    aiMode: boolean;
    alphaStrikeSearchFactions: Array<number>;
    hideMPIntro: boolean;
   
    equipmentEditorFile: string;
    asValues: Record<string, number>;

    mechRulesFilter: number
    mechNameFilter: string
}