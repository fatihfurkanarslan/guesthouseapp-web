// oda-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { OdaService } from '../../../../core/services/oda.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

// core/dtos/misafirhane/misafirhane-result.dto.ts
export interface MisafirhaneResultDto {
  id: number;
  ad: string;
  konum?: string;
  birimKod?: string;
}

// core/dtos/oda/oda-result.dto.ts
export interface OdaResultDto {
  id: number;
  odaNumarasi: string;
  kapasite: number;
  odaTuru: string;
  aktifMi: boolean;
  misafirhane: MisafirhaneResultDto;
}

// features/oda/components/oda-list/misafirhane-tree-node.ts
export interface MisafirhaneTreeNode {
  id: number;
  name: string;
  type: 'misafirhane' | 'oda';
  children?: MisafirhaneTreeNode[];
  data: MisafirhaneResultDto | OdaResultDto;
}
@Component({
  selector: 'app-oda-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './oda-list.component.html',
  styleUrls: ['./oda-list.component.sass']
})
export class OdaListComponent implements OnInit {
  treeControl = new NestedTreeControl<MisafirhaneTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MisafirhaneTreeNode>();

  constructor(
    private odaService: OdaService,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const birim = this.authService.currentUser()?.birim || '';
    this.odaService.getOdalar(birim).subscribe({
      next: flat => this.buildTree(flat),
      error: err => console.error('Oda yüklenirken hata:', err)
    });
  }

  private buildTree(flat: OdaResultDto[]) {
    const map = new Map<number, MisafirhaneTreeNode>();
    flat.forEach(oda => {
      let mh = map.get(oda.misafirhane.id);
      if (!mh) {
        mh = {
          id: oda.misafirhane.id,
          name: oda.misafirhane.ad,
          type: 'misafirhane',
          children: [],
          data: oda.misafirhane
        };
        map.set(mh.id, mh);
      }
      mh.children!.push({
        id: oda.id,
        name: oda.odaNumarasi,
        type: 'oda',
        data: oda
      });
    });

    this.dataSource.data = Array.from(map.values());
  }

  isMisafirhane = (_: number, node: MisafirhaneTreeNode) => node.type === 'misafirhane';
  isOda        = (_: number, node: MisafirhaneTreeNode) => node.type === 'oda';

  onEdit(node: MisafirhaneTreeNode) {
    if (node.type === 'oda') {
      console.log("navi " + node.id)
      //this.router.navigate([node.id], { relativeTo: this.route });
      this.router.navigate(['/oda', node.id]);
    }
  }

  onDelete(node: MisafirhaneTreeNode) {
    if (node.type === 'oda') {
      const oda = node.data as OdaResultDto;
      if (confirm(`Oda ${oda.odaNumarasi} silinsin mi?`)) {
        this.odaService.deleteOda(oda.id).subscribe(() => {
          const remaining = this.dataSource.data
            .flatMap(mh => mh.children!)
            .filter(c => c.id !== oda.id)
            .map(c => c.data as OdaResultDto);
          this.buildTree(remaining);
        });
      }
    }
  }
}