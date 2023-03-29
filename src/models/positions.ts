export interface PositionsResponse {
  success: boolean;
  positions: Position[];
}

export interface Position {
  id: number;
  name: string;
}
