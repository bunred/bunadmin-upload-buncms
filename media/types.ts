export default interface Type {
  id: string
  created_at: number
  updated_at: number
  user_id?: boolean
  type: string
  file_name: string
  file_size: number
  sn: number
  media_name: string
  display_name?: string
}
