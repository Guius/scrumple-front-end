export interface BacklogItemResponseDto {
  id: string;
  name: string;
  description: string;
  points: number;
  label: string;
}

export interface BacklogItemRequestDto {
  name: string;
  description: string;
  points: number;
}
