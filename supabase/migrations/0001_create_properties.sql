-- propertiesテーブルを作成する
CREATE TABLE public.properties (
  id bigint generated always as identity primary key,
  name text NOT NULL,
  rent integer NOT NULL,
  area text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 行単位のセキュリティ（RLS）を有効化する
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- ログイン済みユーザーは物件を参照・登録・更新・削除できる
CREATE POLICY "Authenticated users can select properties"
  ON public.properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete properties"
  ON public.properties FOR DELETE
  TO authenticated
  USING (true);

-- 動作確認用のサンプルデータ
INSERT INTO public.properties (name, rent, area) VALUES
  ('サンライズマンション101', 85000, '東京都渋谷区'),
  ('グリーンハイツ202', 72000, '東京都世田谷区'),
  ('パークサイドビル303', 98000, '東京都港区'),
  ('リバーサイドコート404', 65000, '神奈川県横浜市'),
  ('ヒルトップレジデンス505', 110000, '東京都目黒区'),
  ('サニーコート606', 58000, '埼玉県川口市');
