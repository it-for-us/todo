package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.service.WorkspaceService;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/work-space")
public class WorkspaceController {

    private WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService=workspaceService;
    }

    @PostMapping
    public ResponseEntity<WorkspaceViewDto> createWorkspace(@RequestBody WorkspaceCreateDto workspaceCreateDto){

        WorkspaceViewDto workspaceViewDto = workspaceService.create(workspaceCreateDto,
                LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(workspaceViewDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteWorkspace(@PathVariable Long id){
        workspaceService.deleteWorkspaceById(id, LoggedUsername.getUsernameFromAuthentication());
        return HttpStatus.OK;
    }

    @PutMapping(path="{id}")
    public void updateWorkspace(@PathVariable("id") Long id, @RequestParam(required = false) String name){
        workspaceService.updateWorkspace(id,name);
    }
}


