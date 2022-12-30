package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.service.WorkspaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/work-space")
public class WorkspaceController {

    private WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService=workspaceService;
    }

    @PostMapping
    public ResponseEntity<WorkspaceViewDto> createWorkspace(@RequestBody WorkspaceCreateDto workspaceCreateDto){

        WorkspaceViewDto workspaceViewDto = workspaceService.create(workspaceCreateDto);
        return new ResponseEntity<>(workspaceViewDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteWorkspace(@PathVariable Long id){
        workspaceService.deleteWorkspaceById(id);
        return HttpStatus.OK;
    }
}


