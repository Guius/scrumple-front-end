export interface BacklogItemResponseDto {
  id: string;
  name: string;
  description: string;
  points: number;
  label: string;
}

export interface GetNotCompleteSprintResponseDto {
  sprintId: string;
  sprintNumber: number;
  sprintStartDate?: number;
  sprintDurationWeeks?: number;
  tasks: BacklogItemResponseDto[];
}
