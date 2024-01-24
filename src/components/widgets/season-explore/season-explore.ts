import { autoinject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { CocktailsParams, CocktailsParamsFilter } from 'modules/cocktails/cocktails';
import { Season } from './season';
import { getActiveSeason } from './get-active-season';
import { DevToolsService } from 'services/dev-tools-service';

@autoinject
export class SeasonExplore {
    public selectedSeason: SeasonModel;

    private seasonModels: SeasonModel[] = [
        {
            season: 'halloween',
            imageSrc: 'images/halloween.jpg',
            filter: 'halloween'
        },
        {
            season: 'christmas',
            imageSrc: 'images/christmas.jpg',
            filter: 'christmas'
        }
    ];

    constructor(
        private router: Router,
        private devToolsService: DevToolsService
    ) {}

    @computedFrom('devToolsService.isDevelopment')
    public get isDevelopment() {
        return this.devToolsService.isDevelopment;
    }

    bind() {
        this.selectedSeason = this.getSeason();
    }

    navigateToCocktails() {
        const params: CocktailsParams = {
            activeNavigationIndex: '0',
            filter: this.selectedSeason.filter
        };

        this.router.navigateToRoute('cocktails', params);
    }

    getSeason(): SeasonModel {
        const activeSeason = getActiveSeason(new Date());

        if (activeSeason != null) {
            return this.seasonModels.find(x => x.season === activeSeason);
        }
    }

    nextSeason(event: Event) {
        event.stopPropagation();
        this.selectedSeason =
            this.seasonModels[(this.seasonModels.indexOf(this.selectedSeason) + 1) % this.seasonModels.length];
    }
}

export type SeasonModel = {
    season: Season;
    imageSrc: string;
    filter: CocktailsParamsFilter;
};
