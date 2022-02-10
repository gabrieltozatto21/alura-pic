import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() timeout: number = 3000;
  alerts: Alert[] = []

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService
      .getAlert()
      .subscribe(alert => {
        if(!alert){
          this.alerts = []
          return;
        }
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), this.timeout)
      })
  }

  removeAlert(alertToRemove: Alert){
    this.alerts = this.alerts.filter((alert) => alert != alertToRemove)
  }
  

  getAlertClass(alert: Alert){
    switch(alert.alertType){
      case AlertType.SUCCESS:
        return 'alert alert-success'
      case AlertType.WARNING:
        return 'alert alert-warning'
      case AlertType.INFO:
        return 'alert alert-info'
      case AlertType.DANGER:
        return 'alert alert-danger'
      default:
        return ''
    }
  }

}
