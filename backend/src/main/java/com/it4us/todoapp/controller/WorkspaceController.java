package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.service.WorkspaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/work-space")
public class WorkspaceController {

    private WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService=workspaceService;
    }

    @PostMapping
    public ResponseEntity<WorkspaceViewDto> createWorkspace(@Valid @RequestBody WorkspaceCreateDto workspaceCreateDto){
        WorkspaceViewDto workspaceViewDto = workspaceService.creat(workspaceCreateDto);
        return new ResponseEntity<>(workspaceViewDto, HttpStatus.CREATED);
    }

}
