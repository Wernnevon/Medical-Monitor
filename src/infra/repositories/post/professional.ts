import { inject, Service } from '@angular/core';
import type { Professional } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, writeBatch } from 'firebase/firestore';

@Service()
export class ProfessionalPostRepository {
  private readonly firestore = inject(FIRESTORE);

  async save(professional: Professional): Promise<void> {
    const batch = writeBatch(this.firestore);
    
    const profRef = doc(this.firestore, 'professionals', professional.id);
    batch.set(profRef, professional);
    
    const usernameRef = doc(this.firestore, 'usernames', professional.username);
    batch.set(usernameRef, { uid: professional.id });
    
    await batch.commit();
  }
}
