import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BomDetailsComponent } from "../manufacturing/bom/bom-details/bom-details.component";
import { EcoTagAddComponent } from "./eco-tags/eco-tag-add/eco-tag-add.component";
import { EcoTagsComponent } from "./eco-tags/eco-tags.component";
import { EcoTypeAddComponent } from "./eco-types/eco-type-add/eco-type-add.component";
import { EcoTypesComponent } from "./eco-types/eco-types.component";
import { EcoAddComponent } from "./eco/eco-add/eco-add.component";
import { EcoDetailsComponent } from "./eco/eco-details/eco-details.component";
import { EcoComponent } from "./eco/eco.component";
import { PlmComponent } from "./plm.component";

const plmRoutes: Routes = [
    {
        path: '',
        component: PlmComponent,
    },
    {
        path: 'eco-types',
        children: [
            { path: 'edit/:id', component: EcoTypeAddComponent },
            { path: 'add', component: EcoTypeAddComponent },
            { path: '', component:  EcoTypesComponent},
        ],
    },
    {
        path: 'eco',
        children: [
            { path: 'edit/:id', component: EcoAddComponent },
            { path: 'add', component: EcoAddComponent },
            { path: ':id', component: EcoDetailsComponent },
            { path: '', component:  EcoComponent},
        ]
    },
    {
        path: 'eco-tags',
        children: [
            { path: 'edit/:id', component: EcoTagAddComponent },
            { path: 'add', component: EcoTagAddComponent },
            { path: '', component:  EcoTagsComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(plmRoutes)],
    exports: [RouterModule]
})
export class PlmRoutingModule{}