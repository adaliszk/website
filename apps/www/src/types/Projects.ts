export interface ProjectData
{
    title: string
    description: string
    keywords: string[]
    badges?: string[]
    source?: string
    downloads?: number
    stars?: number
}

export interface ProjectsPage
{
    title: string
    description: string
    keywords: string[]
    items: ProjectData[]
}