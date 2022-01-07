import { Time } from "@angular/common"

export interface Scheduling
{
    //audit
    Id?: number | undefined | null
    Active?: boolean | undefined | null
    RegistrationDate?: Date | undefined | null
    RegistrationUser?: string | undefined | null
    //color
    BackgroundColor?: string | undefined | null
    BorderColor?: string | undefined | null
    TextColor?: string | undefined | null
    Editable?: boolean | undefined | null
    //event
    Title?: string | undefined | null
    AllDay ?: boolean | undefined | null
    InitialDate?: Date | undefined | null
    FinalDate?: Date | undefined | null
    InitialHour?: Time | undefined | null
    FinalHour?: Time | undefined | null
    Place?: string | undefined | null
    Space?: string | undefined | null
    NumberParticipations ?: number | undefined | null
    //responsable
    SameUserResponsable ?: boolean | undefined | null
    Department?: string | undefined | null
    Responsable?: string | undefined | null
    ResponsableContact?: string | undefined | null
    ResponsableEmail?: string | undefined | null
    Observations?: string | undefined | null
    //info afeter event
    EndNumberParticipations?: number | undefined | null
    EndObservations?: string | undefined | null
    
}
