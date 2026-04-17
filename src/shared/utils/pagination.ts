export function getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
}

export function getTotalPages(totalItems: number, limit: number): number {
    return totalItems === 0 ? 0 : Math.ceil(totalItems / limit);
}