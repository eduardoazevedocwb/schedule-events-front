export interface User
{
    //audit
    ID?: number | undefined | null
    Active?: boolean | undefined | null
    RegistrationDate?: Date | undefined | null
    RegistrationUser?: string | undefined | null
    //user
    Name?: string | undefined | null
    Contact?: string | undefined | null
    Email?: string | undefined | null
}
