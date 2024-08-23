import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
