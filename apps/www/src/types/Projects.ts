export interface ProjectData
{
    __type?: string
    title: string
    description: string
    keywords: string[]
    badges: string[]
    source?: string
    downloads?: number | null
    stars?: number | null
}

export interface ProjectsPage
{
    __type?: string
    title: string
    description: string
    keywords: string[]
    items: ProjectData[]
}
