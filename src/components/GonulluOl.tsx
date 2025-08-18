// src/components/GonulluOl.tsx
import { useState, useMemo, type CSSProperties } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default function GonulluOl() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  const [dob, setDob] = useState('');        
  const [kvkk, setKvkk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pillBtn: CSSProperties = {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '9999px',
    border: 'none',
    outline: 'none',
    background: '#51796cff',
    color: '#ffffffff',
    fontWeight: 700,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  };

  const maxDobFor18 = useMemo(() => {
    const t = new Date();
    const cutoff = new Date(t.getFullYear() - 18, t.getMonth(), t.getDate());
    const y = cutoff.getFullYear();
    const m = String(cutoff.getMonth() + 1).padStart(2, '0');
    const d = String(cutoff.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const getAge = (iso: string) => {
    const today = new Date();
    const birth = new Date(iso);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const under18 = !dob || getAge(dob) < 18;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!dob) { setError('Lütfen doğum tarihi giriniz.'); return; }
    if (getAge(dob) < 18) { setError('18 yaşından küçükler başvuramaz.'); return; }
    if (!kvkk) { setError('KVKK onayı zorunludur.'); return; }

    alert('Başvurunuz alındı. Teşekkürler!');
    toggle();
    setDob('');
    setKvkk(false);
  };

  return (
    <>
      <button type="button" style={pillBtn} onClick={toggle}>
        Gönüllü Ol
      </button>

      <Modal isOpen={open} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Gönüllü Başvurusu</ModalHeader>
        <ModalBody>
          {error && <div className="alert alert-danger mb-3">{error}</div>}

          <Form onSubmit={submit} noValidate>
            <FormGroup>
              <Label htmlFor="tc">TC Kimlik Numarası</Label>
              <Input id="tc" required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="ad">Ad Soyad</Label>
              <Input id="ad" required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="iletisim">İletişim (Telefon / Email)</Label>
              <Input id="iletisim" required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dob">Doğum Tarihi</Label>
              <Input
                id="dob"
                type="date"
                required
                max={maxDobFor18}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <small className="text-muted">Yalnızca 18 yaş ve üzeri kişiler başvurabilir.</small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="afet">Afet Türü</Label>
              <Input type="select" id="afet" defaultValue="Deprem">
                <option>Deprem</option>
                <option>Sel</option>
                <option>Yangın</option>
                <option>Diğer</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="yeterlilik">Yeterlilik / Uzmanlık</Label>
              <Input id="yeterlilik" type="textarea" required />
            </FormGroup>

            <FormGroup check className="mb-3">
              <Input
                id="kvkk"
                type="checkbox"
                required
                checked={kvkk}
                onChange={(e) => setKvkk(e.target.checked)}
              />
              <Label htmlFor="kvkk" check>
                Kişisel verilerimin kullanılmasını onaylıyorum.
              </Label>
            </FormGroup>
{/*bu kısmın altı gerekli yeterlilik sağlanmadıysa bu formu onaya göndermiyor*/}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={!kvkk || under18}>
                Gönder
              </button>
              <button type="button" className="btn btn-secondary" onClick={toggle}>
                Vazgeç
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
