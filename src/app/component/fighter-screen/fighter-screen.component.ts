import { ReturnStatement } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild,ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fighter-screen',
  templateUrl:'./fighter-screen.component.html',
  // template:`<canvas #fighterCanvas width="100" height="100"></canvas>`,
  styleUrls: ['./fighter-screen.component.scss']
})
export class FighterScreenComponent implements OnInit,OnChanges{
 
  
  @ViewChild('fighterCanvas',{static:true}) fightCanvas! :ElementRef;
 
  imagesMap = new Map<string,any>();
  areAllImagesLoaded = false;
  hasCharacterLoaded:boolean;

  @Input()
  character:any;

  @Input()
  invert:boolean;

  @Input() 
  width:number;
  
  @Input()
  height:number;

  @Input()
  fighterType:any;

  @Input()
  red:number = 255;

  @Input()
  blue:number = 255;

  @Input()
  green:number = 255;

  @Input()
  atk:number;

  @Input()
  def:number;

  @Input()
  spd:number;
  
  ngOnInit(): void {
    const canvEl:HTMLCanvasElement = this.fightCanvas.nativeElement;
    canvEl.width = this.width;
    canvEl.height = this.height;
    const context = canvEl.getContext('2d');
    // console.log(this.context);
    if(!this.character)
      this.draw(context);
    else
      this.draw(context,this.character);
  }
  
  drawCharacter(context: CanvasRenderingContext2D | null, character: any) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


  valueToHex(val:any){
    var hex = val.toString(16);
    if(hex.length == 1)
      hex = '0'+hex;
    return hex;
  }

  rgbToHex(r:number,g:number,b:number){
    return '#'+(this.valueToHex(r)+this.valueToHex(g)+this.valueToHex(b));
  }

  private draw(ctx: any, character?:any){
    ctx.beginPath();

    if(!character){
      if(!this.fighterType){
        ctx.fillRect(10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20 )    
      }
      else{
        const image = new Image(32,32);
        let name = this.fighterType.currentFighterType.toLowerCase();
        image.src = "assets/imgs/"+name+".png";
        image.onload = () => {
          ctx.drawImage(image,10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20 );
          ctx.globalCompositeOperation = "source-in";
          ctx.fillStyle=this.rgbToHex(this.red,this.green,this.blue);
          ctx.fillRect(10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20);
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 0.5;
          ctx.drawImage(image,10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20 );
          ctx.globalAlpha = 1.0;
          this.drawStatBar(ctx);
          ctx.stroke();
        }

        
      }
    } 
    else{
      const image = new Image(32,32);
      let fighter = this.character.characterChampion;
      let name = fighter.currentFighterType.toLowerCase();
      if(!this.invert)
        image.src = "assets/imgs/"+name+".png";
      else
        image.src = "assets/imgs/"+name+"_inv.png";
      image.onload = () => {
        ctx.drawImage(image,10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20 );
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle=this.rgbToHex(fighter.r,fighter.g,fighter.b);
        ctx.fillRect(10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5;
        ctx.drawImage(image,10, 10, this.fightCanvas.nativeElement.width - 20, this.fightCanvas.nativeElement.width - 20 );
        ctx.globalAlpha = 1.0;
        this.drawStatBar(ctx,fighter);
        ctx.stroke();
      }
    }
    

    
  }

  private drawStatBar(ctx: any,fighter?:any){
    if(!fighter){
      ctx.fillStyle = "red";
      ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3), (this.fightCanvas.nativeElement.width - 20) * (this.fighterType.atkStat/99), 30);
      ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3), this.fightCanvas.nativeElement.width - 20, 30);

      ctx.fillStyle = "blue";
      ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3) + 40, (this.fightCanvas.nativeElement.width - 20) * (this.fighterType.defStat/99), 30);
      ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3) + 40, this.fightCanvas.nativeElement.width - 20, 30);

      ctx.fillStyle = "yellow";
      ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3) + 80, (this.fightCanvas.nativeElement.width - 20) * (this.fighterType.spdStat/99), 30);
      ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3) + 80, this.fightCanvas.nativeElement.width - 20, 30);
      
      ctx.fillStyle = "black";

      ctx.font = '30px Arial';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.fighterType.atkStat,this.fightCanvas.nativeElement.innerWidth - 60,this.fightCanvas.nativeElement.height*(2/3)+16);

      ctx.font = '30px Arial';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.fighterType.defStat,this.fightCanvas.nativeElement.innerWidth -60,this.fightCanvas.nativeElement.height*(2/3)+56);

      ctx.font = '30px Arial';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.fighterType.spdStat,this.fightCanvas.nativeElement.innerWidth - 60,this.fightCanvas.nativeElement.height*(2/3)+96);
    }
    else{
        ctx.fillStyle = "red";
        ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3), (this.fightCanvas.nativeElement.width - 20) * (fighter.atkStat/99), 30);
        ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3), this.fightCanvas.nativeElement.width - 20, 30);
    
        ctx.fillStyle = "blue";
        ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3) + 40, (this.fightCanvas.nativeElement.width - 20) * (fighter.defStat/99), 30);
        ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3) + 40, this.fightCanvas.nativeElement.width - 20, 30);
    
        ctx.fillStyle = "yellow";
        ctx.fillRect(10, this.fightCanvas.nativeElement.height*(2/3) + 80, (this.fightCanvas.nativeElement.width - 20) * (fighter.spdStat/99), 30);
        ctx.rect(10, this.fightCanvas.nativeElement.height*(2/3) + 80, this.fightCanvas.nativeElement.width - 20, 30);
        
        ctx.fillStyle = "black";
    
        ctx.font = '30px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(fighter.atkStat,30,this.fightCanvas.nativeElement.height*(2/3)+16);
    
        ctx.font = '30px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(fighter.defStat,30,this.fightCanvas.nativeElement.height*(2/3)+56);
    
        ctx.font = '30px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(fighter.spdStat,30,this.fightCanvas.nativeElement.height*(2/3)+96);
    }
  }

  updateDrawing(val:any){

  }
}
