from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
from fastapi.responses import FileResponse

app = FastAPI()

tickets_db: Dict[str, Dict] =  {
  "INC2124": {
    "title": "BGP Peering Down on sea3.pod1",
    "ticket_id":"INC2124",
    "created_at": "2025-02-12T14:30:00Z",
    "closed_at": "2025-02-12T17:01:00Z",
    "severity": 2,
    "assigned_to": "network_team",
    "status": "open",
    "correspondences": [
      {
        "seq_number": 1,
        "date": "2025-02-12T14:35:00Z",
        "user_who_commented": "networking_oncall",
        "comment": "Initial alert received from intenal_monitoring_tool. Investigating."
      },
      {
        "seq_number": 2,
        "date": "2025-02-12T14:50:00Z",
        "user_who_commented": "network_engineer",
        "comment": "Issue confirmed on sea3.pod1. Looks to be a bad software upgrade based on device logs"
      },
      {
        "seq_number": 3,
        "date": "2025-02-12T14:50:00Z",
        "user_who_commented": "network_oncall",
        "comment": "Escalaing to sev1 since CRITICAL services affected"
      },
      {
        "seq_number": 4,
        "date": "2025-02-12T15:10:00Z",
        "user_who_commented": "network_engineer",
        "comment": "Checking neighboring router logs for any Errors."
      },
      {
        "seq_number": 5,
        "date": "2025-02-12T15:30:00Z",
        "user_who_commented": "network_engineer",
        "comment": "Reloaded the golden image from Snapshot service"
      },
      {
        "seq_number": 6,
        "date": "2025-02-12T15:32:00Z",
        "user_who_commented": "network_engineer",
        "comment": "The router is up. Checking Logs"
      },
      {
        "seq_number": 7,
        "date": "2025-02-12T16:00:00Z",
        "user_who_commented": "network_engineer",
        "comment": "Down Detector Stable"
      },
      {
        "seq_number": 8,
        "date": "2025-02-12T17:00:00Z",
        "user_who_commented": "networking_oncall",
        "comment": "All alerts gone, service stable. Resolving the ticket"
      }
    ],
    "attached_images": [
      {
        "file_name": "DownDetector.png",
        "file_url": "https://network-logs.com/tickets/12345/bgp_error_log.png"
      },
      {
        "file_name": "NetworkTopogy.png",
        "file_url": "https://network-logs.com/tickets/12345/routing_table_dump.png"
      }
    ],
    "correlation": {
      "related_tickets": [
        {
          "ticket_id": "NT-20250212-001",
          "title": "Packet Loss Detected on sea3.pod1",
          "created_at": "2025-02-12T14:20:00Z",
          "status": "closed"
        },
        {
          "ticket_id": "NT-20250212-002",
          "title": "BGP Flap on sea3.pod2",
          "created_at": "2025-02-12T14:25:00Z",
          "status": "inprogress"
        }
      ]
    }
  }
}

@app.get("/get_ticket")
def get_ticket(incident_id: str, role_as: str):
    ticket = tickets_db.get(incident_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Incident ID not found")
    return {"incident": ticket, "role_as": role_as}


@app.get("/down_detector_spike")
def get_down_detector_spike(start_time: str, company:str):
    return {"start_time": start_time, 
            "company": company, 
            "spike": True, 
            "Users Affected": 583, 
            "HeatMapConcentration": "Greater Seattle Area"}


@app.get("/internal_tool")
def get_internal_tool_link(device_name:str, start_time: str):
    """
    Get the Spike that triggered alarm in the internal monitoring system
    Args:
        start_time (str): _description_
        company (str): _description_

    Returns:
        _type_: _description_
    """
    return {"device_name": device_name,
            "range_start_time": "internal tool start time", 
            "range_end_time": "internal tool start time", 
            "incident_start_time": start_time,
            "device_down": True, 
            "down_duration": "300",
            "url": "http:internal-monitoring-tool/snap12345"}

@app.get("/get_logs")
def get_logs(device_name:str, start_time: str):
    """
    Get the Spike that triggered alarm in the internal monitoring system
    Args:
        start_time (str): _description_
        company (str): _description_

    Returns:
        _type_: _description_
    """
    return {"device_name": device_name,
            "start_time": start_time, 
            "logs_location": "https://docs.google.com/document/d/1qt9ZgE5iB_fPOfoV9DaT1GWoDA2Rl9T1o_N9F0UTDAM/edit?tab=t.0"}


@app.get("/get_snapshot_location")
def get_snapshot_location(device_name:str, incident_id: str):
    """
    Get the location of befor and after snapshots of the Incident
    Args:
        start_time (str): _description_
        company (str): _description_

    Returns:
        _type_: _description_
    """
    return {"device_name": device_name,
            "incident_id": incident_id, 
            "snapshot_before": "https://docs.google.com/document/d/1_kn0J5ug-KmzPbVyZusM2-EyXprftMes_0jd3vUhQwc/edit?tab=t.0",
            "snapshot_after": "https://docs.google.com/document/d/17jbRuezu4ZRiijU-e39bDUNypfW0mqcqrysuXL5FmdA/edit?tab=t.0"}


@app.get("/show_tt")
def show_trouble_ticket():
  return FileResponse("tt.html")