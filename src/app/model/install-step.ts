export interface installStep {
  name: string,
  code: string,
  next?: boolean
  status: boolean,
  show: boolean,
  resultMessage?: string,
  resultData?: any
}
