-- 既存テーブルを削除して間取り・登録者IDカラムを追加した形で再作成する
DROP TABLE IF EXISTS public.properties;

CREATE TABLE public.properties (
  id bigint generated always as identity primary key,
  name text NOT NULL,
  rent integer NOT NULL,
  area text NOT NULL,
  madori text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 行単位のセキュリティ（RLS）を有効化する
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 自分が登録した物件のみ参照できる
CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 自分の物件として新規登録できる（user_idが自分のIDと一致する行のみ）
CREATE POLICY "Users can insert own properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
CREATE POLICY "Users can delete own properties"
  ON public.properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
